import type { User } from "../model/types";

export const STORAGE_KEY = "app_session_v1";

export const getUserFromLocalStorage = (
	setUser: (user: User | null) => void,
	setLoading: (loading: boolean) => void
): User | null => {
	try {
		const storedSession = localStorage.getItem(STORAGE_KEY);
		if (storedSession) {
			const parsed = JSON.parse(storedSession);
			setUser(parsed);
			return parsed;
		}
	} catch (error) {
		console.error("Falha ao carregar sessão:", error);
		localStorage.removeItem(STORAGE_KEY);
	} finally {
		setLoading(false);
	}
	return null;
};
