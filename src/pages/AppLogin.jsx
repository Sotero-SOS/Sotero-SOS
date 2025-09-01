import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { supabase } from "../supabaseClient.js";
import { useAuth } from "../lib/AuthProvider.jsx";

const TABLE_NAME = "usuario";

function AppLogin() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState("");
  const [plainPassword, setPlainPassword] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Vai pra home se ja estiver logado
  useEffect(() => {
    if (!loading && user) {
      navigate("/Home", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    setError(null);

    if (!username.trim() || !plainPassword) {
      setError("Preencha usuário e senha.");
      return;
    }

    const { data, error: dbError } = await supabase
      .from(TABLE_NAME)
      .select("id, username, hashed_password, tipo")
      .eq("username", username.trim())
      .single();

    if (dbError || !data) {
      setError("Usuário ou senha inválidos.");
      return;
    }

    // Usando a senha como uma string qualquer, depois precisa usar hash
    if (data.hashed_password !== plainPassword) {
      setError("Usuário ou senha inválidos.");
      return;
    }

    // Create client-side session
    await login(data.username, data.is_admin);
    navigate("/Home", { replace: true });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 dark:text-gray-200">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 bg-amber-50 rounded-lg m-10 p-10 shadow-xl">
        <img src="sotero.png" alt="Logo SOS" className="w-48" />
        <h1 className="text-2xl font-bold text-gray-700">Sistema SOS</h1>

        <div className="w-full max-w-xs">
          <Input
            label="Usuário"
            placeholder="Digite seu usuário..."
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="w-full max-w-xs">
          <Input
            label="Senha"
            placeholder="Digite sua senha..."
            type="password"
            value={plainPassword}
            onChange={(e) => setPlainPassword(e.target.value)}
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
