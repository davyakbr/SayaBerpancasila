'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SILA_LIST } from '@/lib/constants';
import { ActivityData } from '@/types';
import { Upload, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ActivityFormProps {
  initialData?: ActivityData;
  isEdit?: boolean;
}

function calculateWeekFromDate(dateStr: string): number {
  const day = new Date(dateStr).getDate();
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

export default function ActivityForm({ initialData, isEdit = false }: ActivityFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const initialDateStr = initialData?.date
    ? new Date(initialData.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
    
  const [date, setDate] = useState(initialDateStr);
  const [sila, setSila] = useState<number>(initialData?.sila || 1);
  const [weekNumber, setWeekNumber] = useState<number>(
    initialData?.weekNumber || calculateWeekFromDate(initialDateStr)
  );
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.imageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDateChange = (newDateStr: string) => {
    setDate(newDateStr);
    if (!isEdit && !initialData) {
      setWeekNumber(calculateWeekFromDate(newDateStr));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setErrorMsg(data.error || 'Gagal mengunggah foto');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Terjadi kesalahan saat upload foto');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !sila || !weekNumber) {
      setErrorMsg('Harap isi judul kegiatan, tanggal, nomor Minggu, dan pilih Sila');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const payload = {
      title,
      date,
      sila,
      weekNumber: Number(weekNumber),
      imageUrl,
    };

    try {
      const endpoint = isEdit ? `/api/activities/${initialData?.id}` : '/api/activities';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/kegiatan');
        router.refresh();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Gagal menyimpan data kegiatan');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Terjadi kesalahan jaringan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/kegiatan"
          className="inline-flex items-center gap-2 text-sm font-semibold text-rose-900 hover:text-rose-950 hover:bg-rose-50 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Batal / Kembali
        </Link>
        <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
          {isEdit ? 'Mode Edit Kegiatan' : 'Tambah Kegiatan Baru (Admin)'}
        </span>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-rose-100/80 space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {isEdit ? 'Edit Penerapan Kegiatan' : 'Catat Penerapan Kegiatan Pancasila'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Masukkan penerapan kegiatan harian, tanggal, dan ketikkan Minggu ke berapa kegiatan ini dimasukkan.
          </p>
        </div>

        <div className="space-y-6">
          {/* Title / Penerapan Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">
              Penerapan Kegiatan <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Melaksanakan upacara bendera dalam rangka memperingati Hari Kemerdekaan..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-rose-800 focus:border-rose-800 text-sm font-medium shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-800" /> Hari / Tanggal <span className="text-rose-600">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-rose-800 focus:border-rose-800 text-sm font-medium shadow-xs"
              />
            </div>

            {/* Manual Week Number Input (Admin Types Any Week Number) */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800">
                Minggu ke- <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={52}
                  required
                  placeholder="Ketikkan angka minggu (Contoh: 1, 2, 5, 10...)"
                  value={weekNumber || ''}
                  onChange={(e) => setWeekNumber(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-bold text-sm focus:ring-2 focus:ring-rose-800 shadow-xs"
                />
              </div>
              <p className="text-[11px] text-gray-500 italic">
                Ketikkan secara bebas nomor minggu kegiatan ini (Admin bebas menentukan).
              </p>
            </div>
          </div>

          {/* Sila Selection Radio Cards */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">
              Pilih Sila Pancasila Terkait <span className="text-rose-600">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((sNum) => {
                const info = SILA_LIST[sNum];
                const isSelected = sila === sNum;
                return (
                  <button
                    type="button"
                    key={sNum}
                    onClick={() => setSila(sNum)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[140px] overflow-hidden ${
                      isSelected
                        ? 'border-rose-800 bg-rose-50/80 shadow-maroon/10 ring-2 ring-rose-800'
                        : 'border-gray-200 bg-white hover:border-rose-300 hover:bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-black text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                        {info.roman}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected ? 'bg-rose-900 text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        Sila {sNum}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-900 leading-tight break-words overflow-hidden">
                      {info.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Documentation Upload Section */}
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-bold text-gray-900">
              Foto Dokumentasi Kegiatan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="border-2 border-dashed border-gray-300 hover:border-rose-800 rounded-2xl p-6 text-center bg-gray-50/50 transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-gray-800">
                    {uploading ? 'Mengunggah Foto...' : 'Klik untuk unggah foto dokumentasi'}
                  </p>
                  <p className="text-[11px] text-gray-500">Format PNG, JPG, JPEG (Max 5MB)</p>
                </div>
              </div>

              <div className="h-44 rounded-2xl border border-gray-200 bg-gray-100 overflow-hidden relative flex items-center justify-center">
                {imageUrl ? (
                  <>
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageUrl(null)}
                      className="absolute top-2 right-2 bg-rose-900/80 hover:bg-rose-950 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md"
                    >
                      Hapus Foto
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400 font-medium italic">
                    Belum ada foto terpilih
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <Link
            href="/kegiatan"
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting || uploading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-900 to-maroon-950 hover:from-rose-950 hover:to-rose-900 text-white font-bold text-sm shadow-maroon hover:shadow-lg transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            {submitting ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
          </button>
        </div>
      </div>
    </form>
  );
}
