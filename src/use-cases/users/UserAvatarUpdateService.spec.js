import { UserAvatarUpdateService } from "./UserAvatarUpdateService.js";
import UserRepositoryInMemory from "../../repositories/UserRepositoryInMemory.js";

describe("UserAvatarUpdateService", () => {
  let userRepository;
  let diskStorageMock;
  let sut;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    diskStorageMock = {
      saveFile: jest.fn().mockResolvedValue("new-avatar.jpg"),
      deleteFile: jest.fn().mockResolvedValue(),
    };
    sut = new UserAvatarUpdateService(userRepository, diskStorageMock);
  });

  it("should successfully update the user's avatar", async () => {
    const existingUser = await userRepository.create({
      name: "Existing User",
      email: "user@example.com",
      password: "123",
    });
    const avatarFilename = "new-avatar.jpg";
    const updatedUser = await sut.execute({
      userId: existingUser.id,
      avatarFilename,
    });
    expect(updatedUser.avatar_url).toBe("new-avatar.jpg");
    expect(diskStorageMock.saveFile).toHaveBeenCalledWith(avatarFilename);
    expect(diskStorageMock.deleteFile).not.toHaveBeenCalled();
  });

  it("should delete the old avatar if a new one is provided", async () => {
    const existingUser = await userRepository.create({
      name: "Existing User",
      email: "user@example.com",
      password: "123",
      avatar_url: "old-avatar.jpg",
    });
    const avatarFilename = "new-avatar.jpg";
    const updatedUser = await sut.execute({
      userId: existingUser.id,
      avatarFilename,
    });
    expect(updatedUser.avatar_url).toBe("new-avatar.jpg");
    expect(diskStorageMock.deleteFile).toHaveBeenCalledWith("old-avatar.jpg");
  });
});
