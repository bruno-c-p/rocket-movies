import { UserRepository } from "../../../repositories/UserRepository.js";
import { UserShowService } from "../UserShowService.js";

export function makeUserShowService() {
  const userRepository = new UserRepository();
  const useCase = new UserShowService(userRepository);
  return useCase;
}
