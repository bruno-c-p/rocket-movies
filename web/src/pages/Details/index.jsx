import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { LinkText } from "../../components/LinkText";
import { ArrowLeft, Clock } from "@phosphor-icons/react";
import { StarRating } from "../../components/StarRating/StarRating";
import { Tag } from "../../components/Tag";
import { parse, format } from "date-fns";
import defaultAvatar from "../../assets/default-avatar.svg";

export function Details() {
  const [movieNote, setMovieNote] = useState([]);
  const params = useParams();
  console.log(movieNote);
  const avatarUrl = movieNote.user?.avatar_url
    ? `${api.defaults.baseURL}/files/${movieNote.user?.avatar_url}`
    : defaultAvatar;

  useEffect(() => {
    async function fetchMovieNote() {
      const response = await api.get(`/movie-notes/${params.id}`);
      setMovieNote(response.data);
    }
    fetchMovieNote();
  }, [params]);

  return (
    <div className="mt-12 py-6 px-4 sm:px-6 md:px-12 lg:px-16">
      <article className="max-w-7xl mx-auto flex flex-col items-start">
        <LinkText to="/">
          <ArrowLeft size={12} weight="bold" />
          Voltar
        </LinkText>
        <div className="flex gap-4 mt-6 items-center">
          <h1 className="text-title-leb text-base-title">{movieNote.title}</h1>
          {movieNote.rating && (
            <StarRating rating={movieNote.rating} size={20} />
          )}
        </div>
        <div className="flex items-center gap-10 mt-4 w-full">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl}
              alt="Botão com foto do usuário que abre o perfil"
              height="32"
              width="32"
              className="rounded-full overflow-hidden h-8 w-8"
            />
            <span className="text-sb text-base-title block">
              Por {movieNote.user?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {movieNote.created_at && (
              <>
                <Clock className="text-pink" size={16} weight="bold" />
                <span className="block text-base-title">
                  {format(
                    parse(
                      movieNote.created_at,
                      "yyyy-MM-dd HH:mm:ss",
                      new Date(),
                    ),
                    "dd/MM/yy 'às' HH:mm",
                  )}
                </span>
              </>
            )}
          </div>
        </div>
        <ul className="flex gap-2 mt-10">
          {movieNote.tags &&
            movieNote.tags.map((tag, index) => (
              <Tag key={tag + index} name={tag} />
            ))}
        </ul>
        <p className="mt-10 text-base-title text-mr overflow-y-auto max-h-[40vh]">
          {movieNote.description}
        </p>
      </article>
    </div>
  );
}
