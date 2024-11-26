import { makeUserAvatarUpdateService } from "../use-cases/users/factories/makeUserAvatarUpdateService.js";

export class UserAvatarController {
  async update(req, res) {
    const userId = req.user.id;
    const avatarFilename = req.file.filename;
    const userAvatarUpdateService = makeUserAvatarUpdateService();
    const user = await userAvatarUpdateService.execute({
      userId,
      avatarFilename,
    });
    return res.status(200).send(user);
  }
}
