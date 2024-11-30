import { UserRepository } from "../../../repositories/UserRepository.js";
import { UserValidatedService } from "../UserValidatedService.js";

export function makeUserValidatedService() {
  const userRepository = new UserRepository();
  const useCase = new UserValidatedService(userRepository);
  return useCase;
}
