import { UserRepository } from "../../repositories/UserRepository.js";
import { SessionCreateService } from "../SessionCreateService.js";

export function makeSessionCreateService() {
  const userRepository = new UserRepository();
  const useCase = new SessionCreateService(userRepository);
  return useCase;
}
