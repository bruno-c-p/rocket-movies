import { connection as knex } from "../database/knex/index.js";
import bcrypt from "bcryptjs";
import { NotFoundError } from "../utils/AppError.js";

export class UserRepository {
  async findById(userId) {
    const user = await knex("users").where({ id: userId }).first();
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    return user;
  }

  async findByEmail(email) {
    return knex("users").where({ email }).first();
  }

  async create({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const userId = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });
    return { id: userId };
  }

  async update({ userId, user }) {
    return knex("users").returning("*").where({ id: userId }).update(user);
  }
}
