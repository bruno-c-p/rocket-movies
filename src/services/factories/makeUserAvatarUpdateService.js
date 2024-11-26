import { UserRepository } from "../../repositories/UserRepository.js";
import { UserAvatarUpdateService } from "../UserAvatarUpdateService.js";

export function makeUserAvatarUpdateService() {
  const userRepository = new UserRepository();
  const useCase = new UserAvatarUpdateService(userRepository);
  return useCase;
}
