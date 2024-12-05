import { UnauthorizedError } from "../../utils/AppError.js";

export class UserValidatedService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ userId }) {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError("Unauthorized", 401);
    }
  }
}
