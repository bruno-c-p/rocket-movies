import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { LinkText } from "../../components/LinkText";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import defaultAvatar from "../../assets/default-avatar.svg";
import {
  ArrowLeft,
  Camera,
  EnvelopeSimple,
  LockSimple,
  User,
} from "@phosphor-icons/react";

export function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const avatarUrl = user.avatar_url
    ? `${api.defaults.baseURL}/files/${user.avatar_url}`
    : defaultAvatar;
  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: newPassword,
      old_password: oldPassword,
    };
    const updatedUser = Object.assign(user, updated);
    await updateProfile({ user: updatedUser, avatarFile });
  }

  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    setAvatarFile(file);
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <div>
      <header className="w-full h-56 sm:h-36 bg-pink bg-opacity-5 flex items-start pt-16 px-8 sm:px-28">
        <LinkText onClick={handleBack} className="max-w-sm">
          <ArrowLeft size={12} weight="bold" />
          Voltar
        </LinkText>
      </header>
      <form className="max-w-sm -mt-[88px] mx-auto px-4">
        <div className="relative mt-0 mx-auto mb-8 w-44 h-44">
          <img src={avatar} className="rounded-full bg-cover w-44 h-44" />
          <label
            htmlFor="avatar"
            className="w-12 h-12 bg-pink rounded-full flex items-center justify-center absolute bottom-2 right-2 cursor-pointer p-2"
          >
            <Camera size={20} />
            <input
              id="avatar"
              type="file"
              className="hidden"
              onChange={handleChangeAvatar}
            />
          </label>
        </div>
        <fieldset className="space-y-2">
          <Input
            placeholder="Nome"
            type="text"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="E-mail"
            type="text"
            icon={EnvelopeSimple}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="space-y-2 mt-6">
          <Input
            placeholder="Senha atual"
            type="password"
            icon={LockSimple}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            placeholder="Nova senha"
            type="password"
            icon={LockSimple}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </fieldset>
        <Button title="Salvar" onClick={handleUpdate} className="mt-6" />
      </form>
    </div>
  );
}
