import { makeSessionCreateService } from "../services/factories/makeSessionCreateService.js";

export class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const sessionCreateService = makeSessionCreateService();
    const { user, token } = await sessionCreateService.execute({
      email,
      password,
    });
    return res.status(200).json({ user, token });
  }
}
