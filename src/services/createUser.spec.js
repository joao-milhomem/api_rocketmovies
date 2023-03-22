const UserQuerysTest = require("../database/knex/querys/UserQuerysTest");
const AppError = require("../utils/AppError");
const CreateUser = require("./CreateUser");

describe("Serviços de criação de usuario", () => {
  let userQuerysTest;
  let createUser;

  beforeEach(() => {
    userQuerysTest = new UserQuerysTest();
    createUser = new CreateUser(userQuerysTest);
  });

  it("Criação de user e retorno de ID", async () => {
    const user = {
      name: "User test",
      email: "user@example.com",
      password: "123",
    };

    const userCreated = await createUser.exec(user);
    expect(userCreated).toHaveProperty("id");
  });

  it("Tentativa de criação com email existente", async () => {
    const user1 = {
      name: "User test",
      email: "user@example.com",
      password: "123",
    };

    const user2 = {
      name: "User test",
      email: "user@example.com",
      password: "123",
    };

    await createUser.exec(user1);
    await expect(createUser.exec(user2)).rejects.toEqual(
      new AppError("Esse email já esta em uso")
    );
  });
});
