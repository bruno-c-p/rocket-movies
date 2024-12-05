import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import defaultAvatar from "../../assets/default-avatar.svg";
import { Input } from "../Input";
import { LinkText } from "../LinkText";
import { MovieNotesContext, useMovieNotes } from "../../hooks/movie-notes";

export function Header() {
  const { handleSearch } = useMovieNotes(MovieNotesContext);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  const avatarUrl = user.avatar_url
    ? `${api.defaults.baseURL}/files/${user.avatar_url}`
    : defaultAvatar;

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b-2 border-base-border py-6 px-4 sm:px-6 md:px-12 lg:px-16 bg-background shadow-md">
      <div className="mx-auto max-w-7xl flex flex-wrap justify-between content-start gap-8 md:gap-12 lg:gap-16 items-center">
        <LinkText className="font-bold text-[1.25rem] sm:text-[1.5rem]" to="/">
          RocketMovies
        </LinkText>
        {location.pathname === "/" && (
          <div className="w-full sm:w-auto sm:flex-grow order-3 sm:order-2">
            <Input
              placeholder="Pesquisar pelo título"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        )}
        <div className="flex gap-3 items-center order-2">
          <div className="flex flex-col text-right">
            <span className="text-sb text-base-title">{user.name}</span>
            <button
              className="text-base-label text-sr text-right hover:brightness-10"
              onClick={handleSignOut}
            >
              Sair
            </button>
          </div>
          <LinkText to="/profile">
            <img
              src={avatarUrl}
              alt="Botão com foto do usuário que abre o perfil"
              height="64"
              width="64"
              className="rounded-full overflow-hidden h-12 w-12 md:h-16 md:w-16"
            />
          </LinkText>
        </div>
      </div>
    </header>
  );
}
