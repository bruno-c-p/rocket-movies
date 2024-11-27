import { BadRequestError, ConflictError } from "../../utils/AppError.js";

export class MovieNotesCreateService {
  constructor(movieNotesRepository, movieTagsRepository) {
    this.movieNotesRepository = movieNotesRepository;
    this.movieTagsRepository = movieTagsRepository;
  }

  async execute({ title, description, rating, tags, userId }) {
    if (rating > 5 || rating < 0) {
      throw new BadRequestError("A nota deve estar entre 0 e 5");
    }
    const titleAlreadyExists = await this.movieNotesRepository.findByTitle(
      title
    );
    if (titleAlreadyExists) {
      throw new ConflictError("Este filme já foi adicionado!");
    }
    const movieNote = await this.movieNotesRepository.create({
      title,
      description,
      rating,
      userId,
    });
    const tagsInsert = tags.map((name) => {
      return {
        movie_notes_id: movieNote.id,
        name,
      };
    });
    console.log(tagsInsert);
    await this.movieTagsRepository.create(tagsInsert);
  }
}
