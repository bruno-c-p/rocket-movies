import { UserRepository } from "../../../repositories/UserRepository.js";
import { UserUpdateService } from "../UserUpdateService.js";

export function makeUserUpdateService() {
  const userRepository = new UserRepository();
  const useCase = new UserUpdateService(userRepository);
  return useCase;
}
