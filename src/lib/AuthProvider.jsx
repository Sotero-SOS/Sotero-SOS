import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Contexto de autenticação simples baseado em localStorage.
 * IMPORTANTE: Não faz verificação no servidor nem usa tokens reais.
 */
const AuthContext = createContext({
    user: null,
    loading: true,
    login: async (_u, _p) => ({ ok: false, error: 'not implemented' }),
    logout: () => {},
    isAdmin: false,
});

const STORAGE_KEY = 'app_session_v1';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Tenta carregar sessão gravada no localStorage ao iniciar
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                setUser(parsed);
            }
        } catch (e) {
            console.warn('Falha ao carregar sessão:', e);
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Login "fake": só grava dados localmente.
     * (Em produção deveria chamar backend e receber token/claims)
     */
    const login = async (username, is_admin) => {
        const sessionObj = { username, is_admin: !!is_admin, issued_at: Date.now() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionObj));
        setUser(sessionObj);
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAdmin: user?.is_admin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);

}