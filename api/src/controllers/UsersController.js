import { makeUserCreateService } from "../use-cases/users/factories/makeUserCreateService.js";
import { makeUserShowService } from "../use-cases/users/factories/makeUserShowService.js";
import { makeUserUpdateService } from "../use-cases/users/factories/makeUserUpdateService.js";
import { makeUserValidatedService } from "../use-cases/users/factories/makeUserValidatedService.js";

export class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userCreateService = makeUserCreateService();
    await userCreateService.execute({ name, email, password });
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  }

  async show(req, res) {
    const userId = req.user.id;
    const userShowService = makeUserShowService();
    const user = await userShowService.execute(userId);
    return res.status(200).json(user);
  }

  async update(req, res) {
    const { name, email, newPassword, oldPassword } = req.body;
    const userId = req.user.id;
    const userUpdateService = makeUserUpdateService();
    await userUpdateService.execute({
      name,
      email,
      newPassword,
      oldPassword,
      userId,
    });
    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  }

  async index(request, response) {
    const { userId } = request.user;
    const userValidatedService = makeUserValidatedService();
    await userValidatedService.execute({ userId });
    return response.status(200).json();
  }
}
