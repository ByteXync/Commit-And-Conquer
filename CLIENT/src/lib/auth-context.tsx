"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from './api-service';

type User = {
  id?: string;
  email: string;
  fullName: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  adminLogin: (email: string, password: string, adminCode: string) => Promise<any>;
  register: (fullName: string, email: string, password: string, role: string, adminCode?: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for saved token on component mount
    const loadAuthState = () => {
      try {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (savedToken && savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setToken(savedToken);
          setUser(parsedUser);
          console.log("Loaded auth state from storage:", { token: savedToken, user: parsedUser });
        } else {
          console.log("No saved auth state found");
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
        // Clear potentially corrupted storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure localStorage is available (helps in Next.js)
    setTimeout(loadAuthState, 0);
  }, []);
  
  // Debug auth state changes
  useEffect(() => {
    if (!isLoading) {
      console.log("Auth state updated:", { 
        isAuthenticated: !!token, 
        isAdmin: user?.role === 'ADMIN',
        user,
        token
      });
    }
  }, [user, token, isLoading]);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          role: "USER"
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      
      const data = await response.json();
      
      // Save auth data
      setToken(data.token);
      setUser({
        email: data.email || email,
        fullName: data.fullName || data.name || 'User',
        role: data.role || 'USER',
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        email: data.email || email,
        fullName: data.fullName || data.name || 'User',
        role: data.role || 'USER',
      }));
      
      console.log("Login successful:", data);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const adminLogin = async (email: string, password: string, adminCode: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/user/adminauth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          admin_code: adminCode
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Admin login failed');
      }
      
      const data = await response.json();
      
      // Save auth data
      setToken(data.token);
      setUser({
        email: data.email || email,
        fullName: data.fullName || data.name || 'Admin User',
        role: 'ADMIN', // Force ADMIN role for admin login
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        email: data.email || email,
        fullName: data.fullName || data.name || 'Admin User',
        role: 'ADMIN',
      }));
      
      console.log("Admin login successful:", data);
      return data;
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (
    fullName: string, 
    email: string, 
    password: string, 
    role: string = "USER", 
    adminCode?: string
  ) => {
    setIsLoading(true);
    
    try {
      // Determine if this is an admin registration or regular user
      const isAdminRegistration = role.toUpperCase() === 'ADMIN';
      const endpoint = isAdminRegistration 
        ? 'http://localhost:8000/user/adminauth/register'
        : 'http://localhost:8000/user/register';
      
      const payload = isAdminRegistration 
        ? { fullName, email, password, admin_code: adminCode }
        : { fullName, email, password, role: "USER" };
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      const data = await response.json();
      
      console.log("Registration successful:", data);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("User logged out");
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        adminLogin,
        register,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};