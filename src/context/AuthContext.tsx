// ==============================================================================
// AUTHENTICATION & ROLE PROVIDER (3-TIER IN-APP SYSTEM)
// Roles:
// - 'user': Devotee (No password, profile stored in AsyncStorage + Supabase)
// - 'sangh': Sangh Coordinator (Authorized upload rights for Vihar, Pravachan, Gallery)
// - 'admin': Master Admin (Full in-app master control)
// ==============================================================================

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'user' | 'sangh' | 'admin';

interface AuthContextType {
  role: UserRole;
  isLoggedIn: boolean;
  login: (id: string, pin: string, requestedRole: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: 'user',
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('user');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (id: string, pin: string, requestedRole: UserRole) => {
    // TODO: MANUAL WORK:
    // 1. Verify credentials against Supabase auth.
    // 2. Store session token in `expo-secure-store`.
    setRole(requestedRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setRole('user');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ role, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
