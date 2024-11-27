import { UserCreateService } from "./UserCreateService.js";
import UserRepositoryInMemory from "../../repositories/UserRepositoryInMemory.js";
import { ConflictError } from "../../utils/AppError.js";

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let sut = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    sut = new UserCreateService(userRepositoryInMemory);
  });

  it("user should be created", async () => {
    const user = {
      name: "test",
      email: "user@example.com",
      password: "123",
    };
    const userCreated = await sut.execute(user);
    expect(userCreated).toHaveProperty("id");
  });

  it("user should not be created with an existing email", async () => {
    const userWithNewEmail = {
      name: "test",
      email: "user@example.com",
      password: "123",
    };
    const userWithExistingEmail = {
      name: "test-2",
      email: "user@example.com",
      password: "123",
    };
    await sut.execute(userWithNewEmail);
    await expect(sut.execute(userWithExistingEmail)).rejects.toEqual(
      new ConflictError("Este email já está em uso!")
    );
  });
});
