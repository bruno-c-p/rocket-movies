import { connection as knex } from "../database/knex/index.js";

export class MovieTagsRepository {
  async create(tags) {
    return knex("movie_tags").insert(tags);
  }
}
