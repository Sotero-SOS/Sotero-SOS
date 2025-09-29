import { STORAGE_KEY } from "../const/index";
import type { User } from "@/entities";

export const login = async (
	username: string,
	id: number,
	is_admin: boolean,
	navigate: (rota: string, options: { replace: boolean }) => void, // Changed from any to specific type
	setUser: (user: User | null) => void // Changed from any to specific type
): Promise<{ ok: boolean; error?: string }> => {
	try {
		const sessionObj: User = {
			id,
			username,
			is_admin,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionObj));
		setUser(sessionObj);
		navigate("/home", { replace: true });
		return { ok: true };
	} catch (error: unknown) {
		return { ok: false, error: (error as Error).message || "Login failed" };
	}
};

export const logout = (setUsername: (user: User | null) => void) => {
	localStorage.removeItem(STORAGE_KEY);
	setUsername(null);
};
