export default class UserRepositoryInMemory {
  users = [];

  async create({ email, name, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
    };
    this.users.push(user);
    return user;
  }

  findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }
}
