const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class CreateUser {
  constructor(userQuerys) {
    this.userQuerys = userQuerys;
  }

  async exec({ name, email, password }) {
    const user = await this.userQuerys.find(email);

    if (user) {
      throw new AppError("Esse email já esta em uso");
    }

    const encryptedPassword = await hash(password, 8);

    const userCreated = await this.userQuerys.create({
      name,
      email,
      password: encryptedPassword,
    });

    return userCreated;
  }
}

module.exports = CreateUser;
