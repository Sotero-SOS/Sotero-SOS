import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../lib/utils";
import { useAuth } from "../model/useAuth";
import Button from "@/shared/buttons/ui/Button";
import ForgotPasswordModal from "@/features/forgot_password/ui/ForgotPasswordModal";
import type { User } from "@/entities";
import Input from "@/shared/input/Input";

export const FormLogin = () => {
	const { users, loading, login } = useAuth();
	const [username, setUsername] = useState<string | "">("");
	const [plainPassword, setPlainPassword] = useState("");
	const [error, setError] = useState<string | "">("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	// Vai pra home se ja estiver logado
	useEffect(() => {
		if (!loading && users) {
			navigate("/home", { replace: true });
		}
	}, [users, loading, navigate]);

	/*const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter")
			handleLogin({
				username,
				plainPassword,
				setError,
				setUser: (user: User | null) =>
					void login(
						user?.username || "",
						user?.is_admin || false,
						user?.id || 0,
						user?.hashed_password || ""
					),
			});
	};*/

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
				<h1 className="text-2xl font-bold text-gray-700">
					Sistema SOS
				</h1>

				<div className="w-full max-w-xs">
					<Input
						label="Usuário"
						placeholder="Digite seu usuário..."
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						//onKeyDown={onKeyDown}
					/>
				</div>
				<div className="w-full max-w-xs">
					<Input
						label="Senha"
						placeholder="Digite sua senha..."
						type="password"
						value={plainPassword}
						onChange={(e) => setPlainPassword(e.target.value)}
						//onKeyDown={onKeyDown}
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

				<Button
					onClick={async () =>
						await handleLogin({
							username,
							plainPassword,
							setError,
							setUser: (user: User | null) =>
								void login(
									user?.username || "",
									user?.is_admin || false,
									user?.id || 0,
									user?.hashed_password || ""
								),
							navigate,
						})
					}
				>
					Entrar
				</Button>
			</div>

			<ForgotPasswordModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
};
