import { MovieNotesRepository } from "../../../repositories/MovieNotesRepository.js";
import { MovieNotesShowService } from "../MovieNotesShowService.js";

export function makeMovieNotesShowService() {
  const movieNotesRepository = new MovieNotesRepository();
  const useCase = new MovieNotesShowService(movieNotesRepository);
  return useCase;
}
