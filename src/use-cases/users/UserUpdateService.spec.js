import bcrypt from "bcryptjs";
import { UserUpdateService } from "./UserUpdateService.js";
import UserRepositoryInMemory from "../../repositories/UserRepositoryInMemory.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../utils/AppError.js";

describe("UserUpdateService", () => {
  let userRepositoryInMemory = null;
  let sut = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    sut = new UserUpdateService(userRepositoryInMemory);
  });

  it("should throw a not found error if user is not found", async () => {
    const nonExistentUserId = 999;
    const nonExistentUser = {
      userId: nonExistentUserId,
      name: "NonExistent User",
      email: "user@example.com",
      newPassword: "456",
      oldPassword: "123",
    };
    await expect(sut.execute(nonExistentUser)).rejects.toEqual(
      new NotFoundError("Usuário não encontrado!")
    );
  });

  it("should throw a conflict error if email is already in use by another user", async () => {
    const existingUser = await userRepositoryInMemory.create({
      name: "Existing User",
      email: "user@example.com",
      password: "123",
    });

    const newUserWithDuplicateEmail = {
      userId: existingUser.id + 1,
      name: "New User",
      email: "user@example.com",
      oldPassword: "123",
      newPassword: "456",
    };
    await expect(sut.execute(newUserWithDuplicateEmail)).rejects.toEqual(
      new ConflictError("Este email já está sendo usado!")
    );
  });

  it("should throw a bad request error if the oldPassword is not provided", async () => {
    const existingUser = await userRepositoryInMemory.create({
      name: "Existing User",
      email: "user@example.com",
      password: "123",
    });

    const existingUserToUpdate = {
      userId: existingUser.id,
      email: "user@example.com",
      newPassword: "456",
    };
    await expect(sut.execute(existingUserToUpdate)).rejects.toEqual(
      new BadRequestError("Senha antiga é necessária para atualizar a senha!")
    );
  });

  it("should throw a bad request error if the oldPassword is not provided", async () => {
    const existingUser = await userRepositoryInMemory.create({
      name: "Existing User",
      email: "user@example.com",
      password: "123",
    });

    const existingUserToUpdate = {
      userId: existingUser.id,
      email: "user@example.com",
      oldPassword: "321",
      newPassword: "456",
    };
    await expect(sut.execute(existingUserToUpdate)).rejects.toEqual(
      new BadRequestError("Senha antiga está incorreta!")
    );
  });

  it("should successfully update the user's information", async () => {
    const password = "123";
    const hashedPassword = bcrypt.hashSync(password, 8);

    const existingUser = await userRepositoryInMemory.create({
      name: "Existing User",
      email: "user@example.com",
      password: hashedPassword,
    });

    const existingUserToUpdate = {
      userId: existingUser.id,
      name: "Existing User",
      email: "user.updated@example.com",
      oldPassword: password,
      newPassword: "456",
    };
    const updatedUser = await sut.execute(existingUserToUpdate);
    expect(updatedUser).toEqual(
      expect.objectContaining({
        id: existingUser.id,
        name: existingUserToUpdate.name,
        email: existingUserToUpdate.email,
      })
    );
    const isPasswordUpdated = bcrypt.compareSync(
      existingUserToUpdate.newPassword,
      updatedUser.password
    );
    expect(isPasswordUpdated).toBe(true);
  });
});
