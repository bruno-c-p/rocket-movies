export class UserAvatarUpdateService {
  constructor(userRepository, diskStorage) {
    this.userRepository = userRepository;
    this.diskStorage = diskStorage;
  }

  async execute({ userId, avatarFilename }) {
    const user = await this.userRepository.findById(userId);
    if (user.avatar_url) {
      await this.diskStorage.deleteFile(user.avatar_url);
    }
    const filename = await this.diskStorage.saveFile(avatarFilename);
    user.avatar_url = filename;
    const updatedUser = await this.userRepository.update({ userId, user });
    return updatedUser;
  }
}
