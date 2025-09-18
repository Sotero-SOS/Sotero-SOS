import { createContext } from "react";
import type { User } from "@/entities/user/model/types";

/**
 * Contexto de autenticação simples baseado em localStorage.
 * IMPORTANTE: Não faz verificação no servidor nem usa tokens reais.
 */

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (
		username: string,
		is_admin: boolean
	) => Promise<{ ok: boolean; error?: string }>;
	logout: () => void;
	isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	login: async () => ({ ok: false, error: "not implemented" }),
	logout: () => {},
	isAdmin: false,
});
