import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  EnvelopeSimple,
  LockSimple,
  User,
} from "@phosphor-icons/react";
import { LinkText } from "../../components/LinkText";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useState } from "react";
import { api } from "../../services/api";
import bgAuth from "../../assets/bg-auth.jpg";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }
    api
      .post("/users", { name, email, password })
      .then((response) => {
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível cadastrar o usuário!");
        }
      });
  }

  return (
    <div className="h-screen flex bg-background items-center">
      <form className="py-0 px-4 sm:8 md:px-16 lg:px-32 w-full max-w-2xl mx-auto">
        <h1 className="text-title-leb sm:text-title-xleb text-pink">
          RocketMovies
        </h1>
        <p className="mt-1 text-sr text-base-text">
          Aplicação para acompanhar tudo que assistir.
        </p>
        <h2 className="my-12 text-title-mm text-base-title">Crie sua conta</h2>
        <div className="space-y-2">
          <Input
            placeholder="Nome"
            type="text"
            icon={User}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="E-mail"
            type="text"
            icon={EnvelopeSimple}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            icon={LockSimple}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button title="Cadastrar" onClick={handleSignUp} className="mt-6" />
        <LinkText
          icon={ArrowLeft}
          title="Voltar para o login"
          to="/"
          className="mt-10"
        />
      </form>
      <div className="hidden md:block w-full h-full">
        <img
          src={bgAuth}
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
      </div>
    </div>
  );
}
