import { makeSessionCreateService } from "../use-cases/sessions/factories/makeSessionCreateService.js";
import { __prod__, FIFTEEN_MINUTES } from "../constants.js";

const cookieOptions = {
  httpOnly: true,
  secure: __prod__,
  sameSite: "lax",
  path: "/",
  domain: __prod__ ? `.${process.env.DOMAIN}` : "",
  maxAge: FIFTEEN_MINUTES,
};

export class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const sessionCreateService = makeSessionCreateService();
    const { user, token } = await sessionCreateService.execute({
      email,
      password,
    });
    response.cookie("token", token, cookieOptions);
    return res.status(200).json({ user });
  }
}
