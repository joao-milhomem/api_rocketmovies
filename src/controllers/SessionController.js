const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/authConfig");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();
    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const checkPassword = compare(password, user.password);
    if (!checkPassword) {
      throw new AppError("Email e/ou senha invalido(s)");
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionController;
