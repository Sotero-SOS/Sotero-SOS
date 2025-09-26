import React, { useEffect, useState } from "react";
import { AuthContext } from "@/app/providers/AuthContext";
import type { User } from "@/entities";
import { getUserFromLocalStorage } from "@/entities/usuarios";
import { login, logout } from "@/entities/usuarios";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Tenta carregar sessão gravada no localStorage ao iniciar
	useEffect(() => {
		getUserFromLocalStorage(setUser, setLoading);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				users: user,
				loading,
				login: (
					username: string,
					id: number,
					is_admin: boolean,
				) => login(username, id, is_admin, useNavigate, setUser),
				logout: () => logout(setUser),
				isAdmin: user?.is_admin ?? false,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
