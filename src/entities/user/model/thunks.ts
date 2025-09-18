import { STORAGE_KEY } from "@/entities/user/lib/userLocalStorageActions";
import type { User } from "@/entities/user/model/types";

export const login = async (
	username: string,
	is_admin: boolean,
	setUser: (user: User | null) => void
): Promise<{ ok: boolean; error?: string }> => {
	try {
		const sessionObj = {
			username,
			is_admin: !!is_admin,
			issued_at: Date.now(),
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionObj));
		setUser(sessionObj);
		return { ok: true };
	} catch (error: any) {
		return { ok: false, error: error.message || "Login failed" };
	}
};

export const logout = (setUser: (user: User | null) => void) => {
	localStorage.removeItem(STORAGE_KEY);
	setUser(null);
};
