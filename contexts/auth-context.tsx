"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, AuthUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = (username: string, password: string) => {
    const success = auth.login(username, password);
    if (success) {
      setUser(auth.getCurrentUser());
      router.push('/');
    }
    return success;
  };

  const register = (username: string, password: string) => {
    const success = auth.register(username, password);
    if (success) {
      setUser(auth.getCurrentUser());
      router.push('/');
    }
    return success;
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}