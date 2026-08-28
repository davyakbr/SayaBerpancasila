'use client';

import React, { useEffect, useState } from 'react';
import { ActivityData, WeeklyReflectionData } from '@/types';
import WeeklyTable from '@/components/WeeklyTable';
import PrintablePortfolio from '@/components/PrintablePortfolio';
import ActivityCard from '@/components/ActivityCard';
import { useAdmin } from '@/context/AdminContext';
import { PlusCircle, FileText, Image as ImageIcon, Star, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { isAdmin } = useAdmin();
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [reflection, setReflection] = useState<WeeklyReflectionData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [actRes, refRes] = await Promise.all([
        fetch('/api/activities'),
        fetch('/api/weekly-reflection'),
      ]);

      const actData = await actRes.json();
      const refData = await refRes.json();

      if (Array.isArray(actData)) setActivities(actData);
      if (refData && !refData.error) setReflection(refData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalActivities = activities.length;
  const totalPhotos = activities.filter((a) => a.imageUrl).length;
  const monthlyScore = reflection?.averageScore || 8.5;

  const handleSaveReflection = async (data: { averageScore: number; reason: string }) => {
    try {
      const res = await fetch('/api/weekly-reflection', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const updated = await res.json();
        setReflection(updated);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-rose-900 border-t-amber-400 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-rose-900">Memuat data portofolio Pancasila...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Dashboard Top Banner (REMOVED LOGIN ADMIN BUTTON FROM BANNER) */}
      <div className="bg-gradient-to-r from-rose-950 via-maroon-900 to-rose-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Dashboard Beranda Siswa
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Selamat Datang di <span className="text-amber-400">Saya Berpancasila</span>
          </h1>
          <p className="text-xs sm:text-sm text-rose-100/90 max-w-xl">
            Jurnal harian penerapan Pancasila per Bulan & Minggu.
          </p>
        </div>

        {isAdmin && (
          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full md:w-auto">
            <Link
              href="/kegiatan/tambah"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-rose-950 font-extrabold text-sm px-5 py-3 rounded-2xl shadow-gold hover:scale-105 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Kegiatan (Admin)</span>
            </Link>
          </div>
        )}
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Total Activities */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft flex items-center gap-4 hover:border-rose-300 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-900 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Kegiatan</p>
            <h3 className="text-3xl font-black text-gray-900 mt-0.5">{totalActivities}</h3>
            <p className="text-[11px] text-gray-500">Jurnal harian tercatat</p>
          </div>
        </div>

        {/* Card 2: Total Documentation Photos */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft flex items-center gap-4 hover:border-amber-300 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Foto Dokumentasi</p>
            <h3 className="text-3xl font-black text-gray-900 mt-0.5">{totalPhotos}</h3>
            <p className="text-[11px] text-gray-500">Tersimpan dalam jurnal</p>
          </div>
        </div>

        {/* Card 3: Monthly Score */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-soft flex items-center gap-4 hover:border-blue-300 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Star className="w-7 h-7 fill-blue-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Penilaian Diri Bulanan</p>
            <h3 className="text-3xl font-black text-gray-900 mt-0.5">
              {monthlyScore} <span className="text-sm text-gray-400 font-bold">/ 10</span>
            </h3>
            <p className="text-[11px] text-gray-500">Hasil refleksi bulanan</p>
          </div>
        </div>
      </div>

      {/* Main Weekly Activity Table View (Grouped by Month & Sequential Weeks) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Ringkasan Portofolio Per Bulan & Minggu
          </h2>
          <span className="text-xs font-semibold text-rose-900">Agustus 2026</span>
        </div>

        <WeeklyTable
          activities={activities}
          reflection={reflection}
          onSaveReflection={handleSaveReflection}
          onExportPDF={handleExportPDF}
        />
      </div>

      {/* Latest Activities Cards Grid Preview */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Kegiatan Terbaru
            </h2>
            <p className="text-xs text-gray-500">Daftar penerapan harian yang baru diunggah</p>
          </div>
          <Link
            href="/kegiatan"
            className="text-xs font-bold text-rose-900 hover:text-rose-950 flex items-center gap-1 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200"
          >
            Lihat Semua Kegiatan ({totalActivities}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.slice(0, 3).map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      </div>

      {/* Hidden Printable Container for PDF Export */}
      <PrintablePortfolio activities={activities} reflection={reflection} />
    </div>
  );
}
