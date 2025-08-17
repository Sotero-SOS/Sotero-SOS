import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { supabase } from "../supabaseClient";

function AppLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mail ou senha inválidos.");
    } else {
      navigate("/home");
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 bg-amber-50 rounded-lg m-10 p-10 shadow-xl">
        <img src="sotero.png" alt="Logo SOS" className="w-48" />
        <h1 className="text-2xl font-bold text-gray-700">Sistema SOS</h1>

        <div className="w-full max-w-xs">
          <Input
            label={"Email"}
            placeholder={"Digite seu email..."}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full max-w-xs">
          <Input
            label={"Senha"}
            placeholder={"Digite sua senha..."}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <a
          href="#"
          className="text-sm text-blue-500 hover:underline"
          onClick={() => setIsModalOpen(true)}
        >
          Esqueceu a senha?
        </a>

        <Button onClick={handleLogin}>Entrar</Button>
      </div>

      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default AppLogin;
