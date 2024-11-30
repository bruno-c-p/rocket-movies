import pkg from "jsonwebtoken";
const { verify } = pkg;
import { UnauthorizedError } from "../utils/AppError.js";
import authConfig from "../configs/auth.js";

export function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers;
  if (!authHeader.cookie) {
    throw new UnauthorizedError("JWT token não informado");
  }
  const [, token] = authHeader.cookie.split("token=");
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    req.user = {
      id: Number(user_id),
    };
    return next();
  } catch (error) {
    throw new UnauthorizedError("JWT token inválido");
  }
}
