import { createContext, useEffect } from "react";
import { useContext, useState } from "react";
import { api } from "../services/api";

export const MovieNotesContext = createContext({});

function MovieNoteProvider({ children }) {
  const [movieNotes, setMovieNotes] = useState([]);
  const [search, setSearch] = useState("");

  function handleSearch(title) {
    setSearch(title);
  }

  function addMovieNote(newMovieNote) {
    setMovieNotes((prevNotes) => [...prevNotes, newMovieNote]);
  }

  useEffect(() => {
    async function fetchMovieNotes() {
      const response = await api.get(`/movie-notes?title=${search}`, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        alert(response.error.message);
      }
      setMovieNotes(response.data);
    }
    fetchMovieNotes();
  }, [search]);

  return (
    <MovieNotesContext.Provider
      value={{ handleSearch, movieNotes, addMovieNote }}
    >
      {children}
    </MovieNotesContext.Provider>
  );
}

function useMovieNotes() {
  const context = useContext(MovieNotesContext);
  return context;
}

export { MovieNoteProvider, useMovieNotes };
