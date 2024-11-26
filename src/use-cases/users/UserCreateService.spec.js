require("babel-polyfill");
import UserCreateService from "./UserCreateService.js";
import UserRepositoryInMemory from "../../repositories/UserRepositoryInMemory.js";

it("user should be created", async () => {
  const user = {
    name: "test",
    email: "user@example.com",
    password: "123",
  };
  const userRepositoryInMemory = new UserRepositoryInMemory();
  const userCreateService = new UserCreateService(userRepositoryInMemory);
  const userCreated = await userCreateService.execute(user);
  expect(userCreated).toHaveProperty("id");
});
