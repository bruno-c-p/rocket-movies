import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useRef, useState } from "react";
import { api } from "../../services/api";
import { LinkText } from "../../components/LinkText";
import { ArrowLeft } from "@phosphor-icons/react";
import { MovieTag } from "../../components/MovieTag";
import { MovieNotesContext, useMovieNotes } from "../../hooks/movie-notes";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();
  const { addMovieNote } = useMovieNotes(MovieNotesContext);
  const newTagInputRef = useRef(null);

  function handleAddTag() {
    if (newTag.trim() === "") return;
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
    newTagInputRef.current?.focus();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  }

  function handleRemoveTag(index) {
    setTags(tags.filter((_, i) => i !== index));
  }

  async function handleNewMovieNote() {
    if (!title) {
      return alert("O título é obrigatório!");
    }
    if (newTag) {
      return alert(
        "Existe um marcador em edição que não foi adicionado! Deixe o campo vazio ou adicione o marcador!",
      );
    }
    if (!rating && (rating < 0 || rating > 5)) {
      return alert("A nota é obrigatória e deve estar entre 0 e 5");
    }
    const movieNote = {
      title,
      description,
      rating,
      tags,
    };
    try {
      const response = await api.post("/movie-notes", movieNote);
      addMovieNote({ ...movieNote, id: response.data.movie_notes_id });
    } catch (error) {
      console.error(error);
      alert("Ocorreu um problema ao salvar o filme!");
      return;
    }
    navigate(-1);
  }

  function resetForm() {
    setTitle("");
    setRating(0);
    setDescription("");
    setTags([]);
    setNewTag("");
  }

  return (
    <div className="mt-10 py-6 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col items-start">
          <LinkText to="/">
            <ArrowLeft size={12} weight="bold" />
            Voltar
          </LinkText>
          <h1 className="text-section-title text-white mt-6">Novo filme</h1>
        </header>
        <form className="space-y-10">
          <fieldset className="flex gap-10 flex-wrap">
            <Input
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              max="5"
              placeholder="Sua nota (de 0 a 5)"
              onChange={(e) => setRating(e.target.value)}
            />
            <TextArea
              placeholder="Observações"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </fieldset>
          <fieldset className="flex gap-10 flex-wrap">
            <legend className="text-card-text text-xl">Marcadores</legend>
            <div className="bg-dark-background grid grid-cols md:grid-cols-[repeat(3,minmax(100px,500px))] lg:grid-cols-[repeat(4,minmax(100px,500px))] w-full mt-6 rounded-lg p-4 gap-4">
              {tags &&
                tags.map((tag, index) => (
                  <MovieTag
                    key={tag}
                    value={tag}
                    isNew={false}
                    onClick={() => handleRemoveTag(index)}
                  />
                ))}
              <MovieTag
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                isNew
                onClick={handleAddTag}
                ref={newTagInputRef}
                onKeyDown={handleKeyDown}
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col-reverse gap-4 sm:flex-row md:gap-10">
            <Button variant="secondary" title="Excluir" onClick={resetForm} />
            <Button title="Salvar alterações" onClick={handleNewMovieNote} />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
