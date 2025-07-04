import { createContext, useEffect, memo } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface LoginResult {
  success: boolean;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<LoginResult>;
  loginWithGoogle: () => Promise<LoginResult>;
  logout: () => void;
  clearError: () => void;
  initializeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = memo(function AuthProvider({
  children,
}: AuthProviderProps) {
  const auth = useAuth();

  useEffect(() => {
    // Initialize auth state from localStorage when app starts
    auth.initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
});

export { AuthContext };
