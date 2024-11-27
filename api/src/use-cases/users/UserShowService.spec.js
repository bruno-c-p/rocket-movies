import { UserShowService } from "./UserShowService.js";
import UserRepositoryInMemory from "../../repositories/UserRepositoryInMemory.js";
import { NotFoundError } from "../../utils/AppError.js";

describe("UserShowService", () => {
  let userRepositoryInMemory = null;
  let sut = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    sut = new UserShowService(userRepositoryInMemory);
  });

  it("should retrieve user details", async () => {
    const user = {
      name: "test",
      email: "user@example.com",
      password: "123",
    };
    const createdUser = await userRepositoryInMemory.create(user);
    const userDetails = await sut.execute(createdUser.id);
    expect(userDetails).toEqual(createdUser);
  });

  it("should throw a not found error if user is not found", async () => {
    const nonExistentUserId = 999;
    await expect(sut.execute(nonExistentUserId)).rejects.toEqual(
      new NotFoundError("Usuário não encontrado!")
    );
  });
});
