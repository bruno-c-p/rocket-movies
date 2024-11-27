import { NotFoundError } from "../utils/AppError";

export default class UserRepositoryInMemory {
  users = [];

  async create({ email, name, password, avatar_url = null }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
      avatar_url,
    };
    this.users.push(user);
    return user;
  }

  async update({ userId, user }) {
    const updatedUsers = this.users.map((currentUser) => {
      return currentUser.id === userId
        ? {
            ...currentUser,
            ...user,
          }
        : currentUser;
    });
    this.users = updatedUsers;
    return updatedUsers.find((user) => user.id === userId);
  }

  findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  findById(userId) {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    return user;
  }
}
