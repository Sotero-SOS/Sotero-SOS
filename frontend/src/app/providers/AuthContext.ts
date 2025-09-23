import { createContext } from "react";
import type { User } from "@/entities";

/**
 * Contexto de autenticação simples baseado em localStorage.
 * IMPORTANTE: Não faz verificação no servidor nem usa tokens reais.
 */

export interface AuthContextType {
	users: User | null;
	loading: boolean;
	login: (
		username: string,
		is_admin: boolean,
		id: number,
		hashed_password: string
	) => Promise<{ ok: boolean; error?: string }>;
	logout: () => void;
	isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	users: null,
	loading: true,
	login: async () => ({ ok: false, error: "not implemented" }),
	logout: () => {},
	isAdmin: false,
});
