'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { PlusCircle, BookOpen, LayoutDashboard, Menu, X, FileText, Lock, LogOut, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, logoutAdmin, setIsLoginModalOpen } = useAdmin();

  // Navigation Links (Cover, Beranda, Kegiatan Saya)
  const navLinks = [
    { href: '/', label: 'Cover', icon: BookOpen },
    { href: '/dashboard', label: 'Beranda', icon: LayoutDashboard },
    { href: '/kegiatan', label: 'Kegiatan Saya', icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-maroon-900 to-rose-700 p-0.5 shadow-maroon group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                <img src="/images/garuda.jpg" alt="Garuda" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg text-maroon-950 tracking-tight block leading-none">
                SAYA <span className="text-rose-700">BERPANCASILA</span>
              </span>
              <span className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase block">
                Portofolio Digital Siswa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-900 text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-rose-700'}`} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Admin Role Status & Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-300 text-xs font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mode Admin</span>
                </div>

                <Link
                  href="/kegiatan/tambah"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-900 to-maroon-900 hover:from-rose-950 hover:to-rose-900 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-maroon hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <PlusCircle className="w-4 h-4 text-amber-300" />
                  <span>Tambah Kegiatan</span>
                </Link>

                <button
                  onClick={logoutAdmin}
                  title="Keluar dari Admin"
                  className="p-2 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Mode Lihat (Siswa)</span>
                </div>

                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center gap-1.5 border border-rose-800 text-rose-900 hover:bg-rose-50 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Login Admin</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {!isAdmin ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-xs font-bold bg-rose-900 text-white px-2.5 py-1.5 rounded-lg"
              >
                Login Admin
              </button>
            ) : (
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                Admin
              </span>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white/95 px-4 pt-3 pb-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-rose-900 text-white font-semibold'
                    : 'text-gray-700 hover:bg-rose-50 hover:text-rose-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-rose-700'}`} />
                {link.label}
              </Link>
            );
          })}

          {isAdmin ? (
            <div className="pt-2 space-y-2">
              <Link
                href="/kegiatan/tambah"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-rose-900 text-white font-medium py-3 rounded-xl shadow-md"
              >
                <PlusCircle className="w-5 h-5 text-amber-300" />
                <span>Tambah Kegiatan (Admin)</span>
              </Link>
              <button
                onClick={() => {
                  logoutAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-red-700 font-semibold text-xs border border-red-200 rounded-xl bg-red-50"
              >
                Keluar Mode Admin
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full border border-rose-800 text-rose-900 font-bold py-3 rounded-xl bg-rose-50"
              >
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Login Admin untuk Edit/Tambah</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
