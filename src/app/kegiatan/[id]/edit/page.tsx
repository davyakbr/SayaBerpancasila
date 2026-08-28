'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ActivityForm from '@/components/ActivityForm';
import { useAdmin } from '@/context/AdminContext';
import { ActivityData } from '@/types';
import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditKegiatanPage() {
  const params = useParams();
  const id = params?.id as string;
  const { isAdmin, setIsLoginModalOpen } = useAdmin();

  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/activities/${id}`);
        if (res.ok) {
          const data = await res.json();
          setActivity(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-gray-900">Akses Dibatasi (Khusus Admin)</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Hanya Admin yang dapat mengubah atau mengedit kegiatan ini.
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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-rose-900 border-t-amber-400 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-600">Memuat data kegiatan...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-base font-bold text-red-600">Kegiatan tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <ActivityForm initialData={activity} isEdit={true} />
    </div>
  );
}
