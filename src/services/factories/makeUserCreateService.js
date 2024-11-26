import { UserRepository } from "../../repositories/UserRepository.js";
import { UserCreateService } from "../UserCreateService.js";

export function makeUserCreateService() {
  const userRepository = new UserRepository();
  const useCase = new UserCreateService(userRepository);
  return useCase;
}
