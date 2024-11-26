import { DiskStorage } from "../providers/DiskStorage.js";
import { UnauthorizedError } from "../utils/AppError.js";

export class UserAvatarUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ userId, avatarFilename }) {
    const diskStorage = new DiskStorage();
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError(
        "Somente usuários autenticados podem mudar o avatar!"
      );
    }
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }
    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar_url = filename;
    const updatedUser = await this.userRepository.update({ userId, user });
    return updatedUser;
  }
}
