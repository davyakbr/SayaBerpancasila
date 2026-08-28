'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loginAdmin: () => false,
  logoutAdmin: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
});

export const ADMIN_PIN = '1234'; // Default Admin PIN

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Read saved admin state from localStorage
    const saved = localStorage.getItem('saya_berpancasila_admin');
    if (saved === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const loginAdmin = (pin: string): boolean => {
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      localStorage.setItem('saya_berpancasila_admin', 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('saya_berpancasila_admin');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        loginAdmin,
        logoutAdmin,
        isLoginModalOpen,
        setIsLoginModalOpen,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
