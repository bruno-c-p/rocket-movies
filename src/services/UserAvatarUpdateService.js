import { DiskStorage } from "../providers/DiskStorage.js";
import { UnauthorizedError } from "../utils/AppError.js";

export class UserAvatarUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ user_id, avatarFilename }) {
    const diskStorage = new DiskStorage();
    const user = this.userRepository.findById(user_id);
    if (!user) {
      throw new UnauthorizedError(
        "Somente usuários autenticados podem mudar o avatar!"
      );
    }
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }
    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;
    return this.userRepository.update({ user_id, user });
  }
}
