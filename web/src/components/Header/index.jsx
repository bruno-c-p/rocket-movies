import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { LinkText } from "../LinkText";
import defaultAvatar from "../../assets/default-avatar.svg";
import { Input } from "../Input";

export function Header() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  const avatarUrl = user.avatar_url
    ? `${api.defaults.baseURL}/files/${user.avatar_url}`
    : defaultAvatar;

  return (
    <header className="border-b-2 border-base-border py-6 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl flex flex-wrap justify-between content-start gap-8 md:gap-12 lg:gap-16">
        <LinkText className="font-bold text-[1.25rem] sm:text-[1.5rem]" to="/">
          RocketMovies
        </LinkText>
        <div className="w-full sm:w-auto sm:flex-grow order-3 sm:order-2">
          <Input placeholder="Pesquisar pelo título" />
        </div>
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
