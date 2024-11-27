export class MovieNotesGetAllService {
  constructor(movieNotesRepository) {
    this.movieNotesRepository = movieNotesRepository;
  }

  async execute({ title, userId }) {
    return this.movieNotesRepository.getAllMovies({
      title,
      userId,
    });
  }
}
