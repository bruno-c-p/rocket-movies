import bcrypt from "bcryptjs";
import { BadRequestError, ConflictError } from "../../utils/AppError.js";

export class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, newPassword, oldPassword, userId }) {
    const user = await this.userRepository.findById(userId);
    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new ConflictError("Este email já esta sendo usado!");
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    if (newPassword && !oldPassword) {
      throw new BadRequestError(
        "Senha antiga é necessária para atualizar a senha!"
      );
    }
    const checkOldPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!checkOldPassword) {
      throw new BadRequestError("Senha antiga está incorreta!");
    }

    user.password = bcrypt.hashSync(newPassword, 8);
    return this.userRepository.update({ userId, user });
  }
}