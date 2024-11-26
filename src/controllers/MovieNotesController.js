import { makeMovieNoteCreateService } from "../use-cases/movie-notes/factories/makeMovieNotesCreateService.js";
import { makeMovieNotesGetAllService } from "../use-cases/movie-notes/factories/makeMovieNotesGetAllService.js";
import { makeMovieNotesShowService } from "../use-cases/movie-notes/factories/makeMovieNotesShowService.js";

export class MovieNotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const userId = req.user.id;
    const movieNoteCreateService = makeMovieNoteCreateService();
    await movieNoteCreateService.execute({
      title,
      description,
      rating,
      tags,
      userId,
    });
    res.status(201).json({ message: "Filme criado com sucesso!" });
  }

  async index(req, res) {
    const { title } = req.query;
    const userId = req.user.id;
    const movieNotesGetAllService = makeMovieNotesGetAllService();
    const movieNotesWithTags = await movieNotesGetAllService.execute({
      title,
      userId,
    });
    return res.status(200).json(movieNotesWithTags);
  }

  async show(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const movieNotesShowService = makeMovieNotesShowService();
    const movieNote = await movieNotesShowService.execute({
      movieNoteId: Number(id),
      userId,
    });
    return res.status(200).json(movieNote);
  }
}
