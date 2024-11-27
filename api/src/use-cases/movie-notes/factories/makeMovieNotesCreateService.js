import { MovieNotesRepository } from "../../../repositories/MovieNotesRepository.js";
import { MovieTagsRepository } from "../../../repositories/MovieTagsRepository.js";
import { MovieNotesCreateService } from "../MovieNotesCreateService.js";

export function makeMovieNoteCreateService() {
  const movieNotesRepository = new MovieNotesRepository();
  const movieTagsRepository = new MovieTagsRepository();
  const useCase = new MovieNotesCreateService(
    movieNotesRepository,
    movieTagsRepository
  );
  return useCase;
}
