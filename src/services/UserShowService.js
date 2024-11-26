export class UserShowService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    const user = this.userRepository.findById(userId);
    return user;
  }
}
