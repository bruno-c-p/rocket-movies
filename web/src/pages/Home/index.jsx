import { Plus } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { MovieNoteItem } from "../../components/MovieNoteItem/MovieNoteItem";
import { MovieNotesContext, useMovieNotes } from "../../hooks/movie-notes";

export function Home() {
  const { movieNotes } = useMovieNotes(MovieNotesContext);
  const navigate = useNavigate();

  return (
    <div className="mt-20 sm:mt-16 py-6 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-section-title text-white">Meus Filmes</h1>
          <Button
            className="max-w-fit flex font-normal"
            title="Novo Filme"
            icon={Plus}
            onClick={() => navigate("/new")}
          />
        </div>
        <ul className="mt-10 sm:max-h-[60vh] sm:overflow-y-auto flex flex-col gap-6">
          {movieNotes &&
            movieNotes.map((movieNote) => (
              <MovieNoteItem
                key={movieNote.movie_notes_id}
                movieNote={movieNote}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
