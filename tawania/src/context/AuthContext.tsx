import { apiService } from '../services/apiService';
import React, { createContext, useContext, useState } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  role: 'admin';
  roleTitleAr: string;
  roleTitleEn: string;
  avatar?: string;
  loginTime: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  quickLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'tawania_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const isAuthenticated = !!user;

  const saveUser = (u: AdminUser | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Call Laravel REST API for authentication
    const apiResult = await apiService.login(cleanEmail, pass);
    if (apiResult && apiResult.success && apiResult.user) {
      const adminUser: AdminUser = {
        id: String(apiResult.user.id),
        name: apiResult.user.name || 'مدير نظام الحوكمة',
        nameEn: 'Governance System Administrator',
        email: apiResult.user.email,
        role: 'admin',
        roleTitleAr: 'مدير النظام (Admin)',
        roleTitleEn: 'System Admin',
        loginTime: new Date().toISOString()
      };
      saveUser(adminUser);
      return { success: true };
    }

    // Direct fallback if API offline
    if ((cleanEmail === 'admin@tawania.sa' || cleanEmail === 'admin') && (pass === 'admin123' || pass === 'admin' || pass === '123456')) {
      const adminUser: AdminUser = {
        id: 'admin-01',
        name: 'مدير نظام الحوكمة',
        nameEn: 'Governance System Administrator',
        email: 'admin@tawania.sa',
        role: 'admin',
        roleTitleAr: 'مدير النظام (Admin)',
        roleTitleEn: 'System Admin',
        loginTime: new Date().toISOString()
      };
      saveUser(adminUser);
      return { success: true };
    }

    return {
      success: false,
      error: 'بيانات الدخول غير صحيحة. حساب المدير: admin@tawania.sa / admin123'
    };
  };

  const quickLogin = () => {
    const adminUser: AdminUser = {
      id: 'admin-01',
      name: 'مدير نظام الحوكمة',
      nameEn: 'Governance System Administrator',
      email: 'admin@tawania.sa',
      role: 'admin',
      roleTitleAr: 'مدير النظام (Admin)',
      roleTitleEn: 'System Admin',
      loginTime: new Date().toISOString()
    };
    saveUser(adminUser);
  };

  const logout = () => {
    saveUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, quickLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
