import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService } from '../api/authService';

interface User {
    email: string;
    name: string;
    role: 'admin' | 'operativo';
}

interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        const res = await loginService(email, password);
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
        {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext debe usarse dentro de <AuthProvider>');
  return context;
};
