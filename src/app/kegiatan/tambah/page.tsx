'use client';

import React from 'react';
import ActivityForm from '@/components/ActivityForm';
import { useAdmin } from '@/context/AdminContext';
import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TambahKegiatanPage() {
  const { isAdmin, setIsLoginModalOpen } = useAdmin();

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-gray-900">Akses Dibatasi (Khusus Admin)</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Hanya Admin yang dapat menambahkan kegiatan baru. Pengunjung berada dalam mode lihat (read-only).
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full py-3 bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm rounded-xl shadow-md transition-all"
          >
            Login Sebagai Admin
          </button>
          <Link
            href="/kegiatan"
            className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 py-2"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Kegiatan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <ActivityForm isEdit={false} />
    </div>
  );
}
