/* Define os tipos para o usuário e contexto de autenticação */
export interface User {
	username: string | null;
	is_admin: boolean;
	issued_at: number;
}
