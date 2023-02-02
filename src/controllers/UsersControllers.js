const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (user) {
      throw new AppError("Esse email já esta em uso");
    }

    const encryptedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: encryptedPassword,
    });

    return response.json({});
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("Usuario não encontrado");
    }

    const emailOwner = await knex("users").where({ email }).first();

    if (emailOwner && emailOwner.id !== user.id) {
      throw new AppError("Email já está em uso");
    }

    if (password && !old_password) {
      throw new AppError("Digite sua antiga senha");
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password);
      if (!checkPassword) {
        throw new AppError("Senhas não conferem");
      } else {
        user.password = await hash(password, 8);
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await knex("users").where({ id: user.id }).update({
      name,
      email,
      password: user.password,
    });

    return response.json({});
  }
}

module.exports = UsersControllers;
