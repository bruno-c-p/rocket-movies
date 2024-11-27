export class MovieNotesShowService {
  constructor(movieNotesRepository) {
    this.movieNotesRepository = movieNotesRepository;
  }

  async execute({ movieNoteId, userId }) {
    return this.movieNotesRepository.findById({
      movieNoteId,
      userId,
    });
  }
}
