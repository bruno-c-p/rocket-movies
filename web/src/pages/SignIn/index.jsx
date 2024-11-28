import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { EnvelopeSimple, LockSimple } from "@phosphor-icons/react";
import { LinkText } from "../../components/LinkText";
import bgAuth from "../../assets/bg-auth.jpg";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  function handleSignIn() {
    signIn({ email, password });
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
        <h2 className="my-12 text-title-mm text-base-title">Faça seu login</h2>
        <div className="space-y-2">
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
        <Button title="Entrar" onClick={handleSignIn} className="mt-6" />
        <LinkText title="Criar conta" to="/register" className="mt-10" />
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
