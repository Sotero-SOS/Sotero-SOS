import React, { useEffect, useState } from "react";
import { AuthContext } from "@/app/providers/AuthContext";
import type { User } from "@/entities/user/model/types";
import { getUserFromLocalStorage } from "@/entities/user/lib/userLocalStorageActions";
import { login, logout } from "@/entities/user/model/thunks";

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
				user,
				loading,
				login: (username, is_admin) =>
					login(username, is_admin, setUser),
				logout: () => logout(setUser),
				isAdmin: user?.is_admin ?? false,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
