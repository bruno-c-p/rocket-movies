import { connection as knex } from "../database/knex/index.js";
import { NotFoundError } from "../utils/AppError.js";

export class MovieNotesRepository {
  async findByTitle(title) {
    return knex("movie_notes").where({ title }).first();
  }

  async create({ title, description, rating, userId }) {
    const [id] = await knex("movie_notes").insert(
      {
        title,
        description,
        rating,
        user_id: userId,
      },
      ["id"]
    );
    return id;
  }

  async findById({ movieNoteId, userId }) {
    const movieNote = await knex("movie_notes")
      .where({ id: movieNoteId, user_id: userId })
      .first();
    if (!movieNote) {
      throw new NotFoundError("Filme não encontrado!");
    }
    const user = await knex("users")
      .select("users.name", "users.avatar_url")
      .where({ id: userId })
      .first();
    const tags = await knex("movie_tags").where({
      movie_notes_id: movieNote.id,
    });
    return {
      ...movieNote,
      tags: [...tags.map((tag) => tag.name)],
      user: { ...user },
    };
  }

  async getAllMovies({ title = "", userId }) {
    const movieNotes = await knex("movie_notes")
      .select(
        "movie_notes.id as movie_notes_id",
        "movie_notes.title",
        "movie_notes.description",
        "movie_notes.rating"
      )
      .where({ user_id: userId })
      .whereLike("title", `%${title}%`);
    const tags = await knex("movie_tags").whereIn(
      "movie_notes_id",
      movieNotes.map((movie) => movie.movie_notes_id)
    );
    const movieNotesWithTags = movieNotes.map((movie) => {
      const movieNoteTags = tags.filter(
        (tag) => tag.movie_notes_id === movie.movie_notes_id
      );
      return {
        ...movie,
        tags: [...movieNoteTags.map((tag) => tag.name)],
      };
    });
    return movieNotesWithTags;
  }
}
