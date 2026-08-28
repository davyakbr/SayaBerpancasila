'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Lock, KeyRound, X, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminLoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin } = useAdmin();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = loginAdmin(pin);
    if (!success) {
      setErrorMsg('PIN Admin salah. Silakan coba kembali.');
    } else {
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-rose-100">
        <button
          onClick={() => {
            setIsLoginModalOpen(false);
            setErrorMsg('');
            setPin('');
          }}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-rose-100 text-rose-900 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900">Masuk Mode Admin</h3>
          <p className="text-xs text-gray-500">
            Masukkan PIN Admin untuk mengakses fitur pengubahan portofolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase">
              PIN Keamanan Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                maxLength={6}
                placeholder="Masukkan PIN Admin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-center font-mono text-lg font-bold text-gray-900 tracking-widest focus:ring-2 focus:ring-rose-800 focus:border-rose-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-rose-900 to-maroon-950 text-white font-bold text-sm rounded-xl shadow-maroon hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>Login Sebagai Admin</span>
          </button>
        </form>
      </div>
    </div>
  );
}
