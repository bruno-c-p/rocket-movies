import { makeUserAvatarUpdateService } from "../services/factories/makeUserAvatarUpdateService.js";

export class UserAvatarController {
  async update(req, res) {
    const user_id = req.user.id;
    const avatarFilename = req.file.filename;
    const userAvatarUpdateService = makeUserAvatarUpdateService();
    const user = userAvatarUpdateService.execute({ user_id, avatarFilename });
    return res.status(200).send(user);
  }
}
