import { ConflictError } from "../utils/AppError.js";

export class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new ConflictError("Este email já está em uso!");
    }
    const userCreated = await this.userRepository.create({
      name,
      email,
      password,
    });
    return userCreated;
  }
}
