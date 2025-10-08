import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('remindai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username: email.split('@')[0]
    };
    localStorage.setItem('remindai_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signUp = async (email: string, password: string, username: string) => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username
    };
    localStorage.setItem('remindai_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = async () => {
    localStorage.removeItem('remindai_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
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
