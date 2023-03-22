const knex = require("../");

class UserQuerys {
  async find(email) {
    const user = await knex("users").where({ email }).first();
    return user;
  }

  async create({ name, email, password }) {
    const user_id = await knex("users").insert({
      name,
      email,
      password,
    });

    return { id: user_id };
  }
}

module.exports = UserQuerys;
