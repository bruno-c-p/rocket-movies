import { MovieNotesRepository } from "../../../repositories/MovieNotesRepository.js";
import { MovieNotesGetAllService } from "../MovieNotesGetAllService.js";

export function makeMovieNotesGetAllService() {
  const movieNotesRepository = new MovieNotesRepository();
  const useCase = new MovieNotesGetAllService(movieNotesRepository);
  return useCase;
}
