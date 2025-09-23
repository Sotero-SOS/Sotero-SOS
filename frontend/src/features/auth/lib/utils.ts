import type React from "react";
import { authAPI } from "@/entities/usuarios/api/auth";
import type { User } from "@/entities";

export const handleLogin = async (props: {
	username: string | "";
	plainPassword: string;
	setError: React.Dispatch<React.SetStateAction<string | "">>;
	setUser: (user: User | null) => void;
	navigate: (rota: string, options: { replace: boolean }) => void; // Changed from any to specific type
}) => {
	props.setError("");

	if (!props.username.trim() || !props.plainPassword) {
		props.setError("Preencha usuário e senha.");
		return;
	}

	await authAPI({
		username: props.username,
		setUser: props.setUser,
		setError: props.setError,
		plainPassword: props.plainPassword,
		cargo: "",
		navigate: props.navigate,
	});
};
