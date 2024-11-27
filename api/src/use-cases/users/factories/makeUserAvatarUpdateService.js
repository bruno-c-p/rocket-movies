import { DiskStorage } from "../../../providers/DiskStorage.js";
import { UserRepository } from "../../../repositories/UserRepository.js";
import { UserAvatarUpdateService } from "../UserAvatarUpdateService.js";

export function makeUserAvatarUpdateService() {
  const userRepository = new UserRepository();
  const diskStorage = new DiskStorage();
  const useCase = new UserAvatarUpdateService(userRepository, diskStorage);
  return useCase;
}
