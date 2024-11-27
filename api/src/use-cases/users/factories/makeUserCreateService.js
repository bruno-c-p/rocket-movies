import { UserCreateService } from "../UserCreateService.js";
import { UserRepository } from "../../../repositories/UserRepository.js";

export function makeUserCreateService() {
  const userRepository = new UserRepository();
  const useCase = new UserCreateService(userRepository);
  return useCase;
}
