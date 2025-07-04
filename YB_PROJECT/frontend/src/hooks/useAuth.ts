import { useState, useCallback } from 'react';
import { useLoadingState } from './useCommon';
import { safeLocalStorage } from '../utils/safeLocalStorage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });

  const { loading, withLoading } = useLoadingState();

  const login = useCallback(async (credentials: LoginCredentials) => {
    return withLoading(async () => {
      try {
        setAuthState(prev => ({ ...prev, error: null }));
        
        // Demo login - accept any email with password "123"
        if (credentials.password === '123') {
          const user: User = {
            id: '1',
            email: credentials.email,
            name: credentials.email.split('@')[0] || 'User',
            avatar: undefined,
          };

          setAuthState({
            user,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          // Store in localStorage for persistence
          safeLocalStorage.setJSON('auth', { user, isAuthenticated: true });
          
          return { success: true, user };
        } else {
          throw new Error('Invalid credentials. Use password "123" for demo.');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        throw error;
      }
    });
  }, [withLoading]);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    return withLoading(async () => {
      try {
        setAuthState(prev => ({ ...prev, error: null }));
        
        // Demo signup - accept any email with matching passwords
        if (credentials.password !== credentials.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (credentials.password.length < 3) {
          throw new Error('Password must be at least 3 characters long');
        }

        const user: User = {
          id: Date.now().toString(),
          email: credentials.email,
          name: credentials.email.split('@')[0] || 'User',
          avatar: undefined,
        };

        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });

        // Store in localStorage for persistence
        safeLocalStorage.setJSON('auth', { user, isAuthenticated: true });
        
        return { success: true, user };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Signup failed';
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        throw error;
      }
    });
  }, [withLoading]);

  const loginWithGoogle = useCallback(async () => {
    return withLoading(async () => {
      try {
        setAuthState(prev => ({ ...prev, error: null }));
        
        // Demo Google login
        const user: User = {
          id: '2',
          email: 'demo@google.com',
          name: 'Google User',
          avatar: undefined,
        };

        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });

        safeLocalStorage.setJSON('auth', { user, isAuthenticated: true });
        
        return { success: true, user };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Google login failed';
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        throw error;
      }
    });
  }, [withLoading]);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
    safeLocalStorage.removeItem('auth');
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  const initializeAuth = useCallback(() => {
    try {
      const stored = safeLocalStorage.getJSON('auth') as any;
      if (stored && stored.isAuthenticated && stored.user) {
        setAuthState({
          user: stored.user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      safeLocalStorage.removeItem('auth');
    }
  }, []);

  return {
    ...authState,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    clearError,
    initializeAuth,
  };
}
