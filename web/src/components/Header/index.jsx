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

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : defaultAvatar;

  return (
    <header className="border-b-2 border-base-border py-6">
      <div className="mx-auto max-w-7xl flex justify-between gap-16">
        <LinkText
          className="font-bold text-[1.5rem]"
          title="RocketMovies"
          to="/"
        />
        <Input placeholder="Pesquisar pelo título" />
        <div className="flex gap-3 items-center">
          <div className="flex flex-col text-right">
            <span className="text-sb text-base-title">{user.name}</span>
            <button
              className="text-base-label text-sr text-right"
              onClick={handleSignOut}
            >
              Sair
            </button>
          </div>
          <img
            src={avatarUrl}
            alt="Botão com foto do usuário que abre o perfil"
            height={64}
            width={64}
            className="rounded-full overflow-hidden min-h-16 min-w-16"
          />
        </div>
      </div>
    </header>
  );
}
