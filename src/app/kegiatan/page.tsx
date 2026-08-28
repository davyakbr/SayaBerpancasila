'use client';

import React, { useEffect, useState } from 'react';
import { ActivityData } from '@/types';
import ActivityCard from '@/components/ActivityCard';
import SilaBadge from '@/components/SilaBadge';
import PrintablePortfolio from '@/components/PrintablePortfolio';
import { useAdmin } from '@/context/AdminContext';
import { Search, PlusCircle, LayoutGrid, ListFilter, X, Printer, Calendar, Lock, Filter } from 'lucide-react';
import Link from 'next/link';

export default function KegiatanPage() {
  const { isAdmin, setIsLoginModalOpen } = useAdmin();

  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSila, setSelectedSila] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedDetail, setSelectedDetail] = useState<ActivityData | null>(null);

  const fetchActivities = async () => {
    try {
      let url = '/api/activities?';
      if (selectedSila !== 'all') url += `sila=${selectedSila}&`;
      if (selectedWeek !== 'all') url += `week=${selectedWeek}&`;
      if (selectedMonth !== 'all') url += `month=${selectedMonth}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) setActivities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [selectedSila, selectedWeek, selectedMonth, searchQuery]);

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) return;
    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setActivities(activities.filter((a) => a.id !== id));
        if (selectedDetail?.id === id) setSelectedDetail(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportSinglePDF = () => {
    window.print();
  };

  const monthsList = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-rose-950 tracking-tight">
            Kegiatan Saya
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Daftar lengkap diary jurnal kegiatan harian penerapan 5 Sila Pancasila.
          </p>
        </div>

        {isAdmin ? (
          <Link
            href="/kegiatan/tambah"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-900 to-maroon-950 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-maroon hover:shadow-lg hover:scale-105 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Tambah Kegiatan</span>
          </Link>
        ) : (
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 border border-rose-800 text-rose-900 bg-rose-50 hover:bg-rose-100 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Login Admin untuk Edit/Tambah</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari penerapan kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-rose-800 focus:border-rose-800"
            />
          </div>

          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-900 shrink-0" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-rose-800"
            >
              <option value="all">Semua Bulan</option>
              {monthsList.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Week Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-900 shrink-0" />
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-rose-800"
            >
              <option value="all">Semua Minggu</option>
              <option value="1">Minggu ke-1</option>
              <option value="2">Minggu ke-2</option>
              <option value="3">Minggu ke-3</option>
              <option value="4">Minggu ke-4</option>
            </select>
          </div>
        </div>

        {/* Quick Sila Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-500 mr-1">Filter Sila:</span>
          <button
            onClick={() => setSelectedSila('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              selectedSila === 'all'
                ? 'bg-rose-900 text-white border-rose-900'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            Semua Sila
          </button>
          {[1, 2, 3, 4, 5].map((sNum) => (
            <button
              key={sNum}
              onClick={() => setSelectedSila(sNum.toString())}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                selectedSila === sNum.toString()
                  ? 'bg-rose-900 text-white border-rose-900'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              Sila {sNum}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-rose-900 border-t-amber-400 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-gray-600">Memuat daftar kegiatan...</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-rose-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-800 flex items-center justify-center mx-auto">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Belum Ada Kegiatan</h3>
          <p className="text-xs text-gray-500">
            Tidak ada data kegiatan yang cocok dengan pencarian atau filter bulan/minggu/Sila Anda.
          </p>
          {isAdmin && (
            <Link
              href="/kegiatan/tambah"
              className="inline-flex items-center gap-2 bg-rose-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md"
            >
              + Catat Kegiatan Pertama
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((act) => (
            <ActivityCard
              key={act.id}
              activity={act}
              onDelete={handleDelete}
              onSelectDetail={(a) => setSelectedDetail(a)}
            />
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in print:hidden">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDetail(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedDetail.imageUrl && (
              <div className="h-56 rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={selectedDetail.imageUrl}
                  alt={selectedDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <SilaBadge sila={selectedDetail.sila} size="lg" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                  Minggu ke-{selectedDetail.weekNumber || 1}
                </span>
                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-800" />
                  {new Date(selectedDetail.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h4 className="text-xs font-bold uppercase text-gray-700">Penerapan Kegiatan:</h4>
              <p className="text-base font-bold text-gray-900 leading-relaxed">{selectedDetail.title}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleExportSinglePDF}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-blue-400 text-blue-700 bg-blue-50 hover:bg-blue-100 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Export Kegiatan Ini (PDF)</span>
              </button>

              {isAdmin && (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    href={`/kegiatan/${selectedDetail.id}/edit`}
                    className="flex-1 sm:flex-initial text-center px-4 py-2.5 bg-rose-900 text-white rounded-xl text-xs font-bold hover:bg-rose-950 transition-colors"
                  >
                    Edit Kegiatan
                  </Link>
                  <button
                    onClick={() => handleDelete(selectedDetail.id)}
                    className="px-4 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedDetail && (
        <PrintablePortfolio activities={activities} reflection={null} singleActivity={selectedDetail} />
      )}
    </div>
  );
}
