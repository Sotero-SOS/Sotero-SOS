/* Define os tipos para o usuário e contexto de autenticação */

export const TABLE_NAME = "user"; // must match your existing table

export type User = {
	id: number;
	username: string;
	is_admin?: boolean;
	hashed_password?: string;
	tipo: string; // Optional: may not be present in all contexts
};
