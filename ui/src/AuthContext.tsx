// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  user: string | undefined;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null; // New method to retrieve the token
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ( {children} ) => {
  const [user, setUser] = useState<string | undefined>(undefined);

  const login = (token: string) => {
    const decoded = jwtDecode(token);
    setUser(decoded.sub);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('token');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      login(storedToken);
    }
  }, []);

  const contextValue: AuthContextProps = {
    user,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};