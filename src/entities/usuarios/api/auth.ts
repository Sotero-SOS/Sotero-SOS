import { supabase } from "@/app/api/supabaseClient";
import { TABLE_NAME, type User } from "@/entities/usuarios";
import { login } from "@/entities/usuarios";
import type React from "react";

export const authAPI = async (props: {
	username: string | "";
	setUser: (user: User | null) => void;
	setError: React.Dispatch<React.SetStateAction<string | "">>;
	plainPassword: string;
	cargo: string;
	navigate: (rota: string, options: { replace: boolean }) => void; // Changed from any to specific type
}) => {
	const { data, error: dbError } = await supabase
		.from(TABLE_NAME)
		.select("id, username, hashed_password, is_admin")
		.eq("username", props.username.trim())
		.single();

	if (dbError || !data) {
		props.setError("Usuário ou senha inválidos.");
		return;
	}

	if (data.hashed_password !== props.plainPassword) {
		props.setError("Usuário ou senha inválidos.");
		return;
	}

	// Create client-side session
	await login(
		data.username,
		data.id,
		data.is_admin,
		props.navigate,
		props.setUser
	);
};
