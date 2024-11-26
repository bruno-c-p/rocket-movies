import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { UnauthorizedError } from "../../utils/AppError.js";
import authConfig from "../../configs/auth.js";

export class SessionCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Email e/ou senha incorreta");
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new UnauthorizedError("Email e/ou senha incorreta");
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    return { user, token };
  }
}
