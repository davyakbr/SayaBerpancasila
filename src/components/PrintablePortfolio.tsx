'use client';

import React from 'react';
import { ActivityData, WeeklyReflectionData } from '@/types';
import { STUDENT_IDENTITY } from '@/lib/constants';

interface PrintablePortfolioProps {
  activities: ActivityData[];
  reflection: WeeklyReflectionData | null;
  singleActivity?: ActivityData | null;
}

export default function PrintablePortfolio({
  activities,
  reflection,
  singleActivity,
}: PrintablePortfolioProps) {
  const formatDateFull = (dateStr: string | Date) => {
    const d = new Date(dateStr);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const listToDisplay = singleActivity ? [singleActivity] : activities;

  // Group by week number
  const weeksMap: Record<number, ActivityData[]> = {};
  listToDisplay.forEach((act) => {
    const wNum = act.weekNumber || 1;
    if (!weeksMap[wNum]) weeksMap[wNum] = [];
    weeksMap[wNum].push(act);
  });

  const sortedWeekNumbers = Object.keys(weeksMap)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div id="printable-portfolio" className="hidden print:block text-black bg-white font-sans p-8">
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm;
          }
          body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .page-break {
            page-break-after: always;
          }
        }
      `}</style>

      {/* COVER PAGE */}
      {!singleActivity && (
        <div className="flex flex-col items-center justify-between min-h-[90vh] text-center border-4 border-rose-900 p-8 rounded-3xl page-break">
          <div className="space-y-4 pt-4">
            <img src="/images/garuda.jpg" alt="Garuda" className="w-32 h-32 mx-auto object-contain" />
            <h1 className="text-3xl font-black text-rose-900 tracking-tight uppercase">
              PORTOFOLIO DIGITAL
            </h1>
            <h2 className="text-2xl font-bold text-amber-600 tracking-wide">
              "SAYA BERPANCASILA"
            </h2>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">
              Jurnal Penerapan Nilai-Nilai Pancasila Dalam Kehidupan Sehari-Hari
            </p>
          </div>

          <div className="space-y-4 my-6">
            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-rose-900 shadow-md">
              <img src="/images/profile.jpg" alt="Davy Akbar Pahlevi" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-gray-900 uppercase">{STUDENT_IDENTITY.name}</h3>
              <p className="text-sm font-bold text-rose-900">{STUDENT_IDENTITY.fase}</p>
              <p className="text-xs text-gray-600 font-mono">NIS: {STUDENT_IDENTITY.nis} • Absen: {STUDENT_IDENTITY.absen}</p>
              <p className="text-xs font-semibold text-gray-700">{STUDENT_IDENTITY.sekolah} • {STUDENT_IDENTITY.tahun}</p>
            </div>
          </div>

          <div className="w-full bg-rose-50 border border-rose-200 rounded-2xl p-4 text-left text-xs space-y-2">
            <h4 className="font-bold text-rose-950 text-center uppercase border-b border-rose-200 pb-1">
              Daftar 5 Sila Pancasila
            </h4>
            <div className="grid grid-cols-1 gap-1 font-medium text-gray-800">
              <p>1. Ketuhanan Yang Maha Esa</p>
              <p>2. Kemanusiaan Yang Adil dan Beradab</p>
              <p>3. Persatuan Indonesia</p>
              <p>4. Kerakyatan Yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan</p>
              <p>5. Keadilan Sosial Bagi Seluruh Rakyat Indonesia</p>
            </div>
          </div>
        </div>
      )}

      {/* DIARY TABLES FOR EACH WEEK */}
      <div className="space-y-8 pt-4">
        <div className="border-b-2 border-rose-900 pb-3 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-rose-900">
              PORTOFOLIO "Saya Berpancasila"
            </h2>
            <p className="text-xs font-semibold text-gray-600">
              {STUDENT_IDENTITY.name} ({STUDENT_IDENTITY.kelas}) - {STUDENT_IDENTITY.sekolah}
            </p>
          </div>
        </div>

        {sortedWeekNumbers.map((wNum) => {
          const weekActivities = weeksMap[wNum];
          const docPhotos = weekActivities.filter((a) => a.imageUrl).map((a) => a.imageUrl as string);
          const weeklySinglePhoto = docPhotos.length > 0 ? docPhotos[0] : null;

          return (
            <div key={wNum} className="space-y-2">
              <h3 className="font-bold text-sm text-gray-800 uppercase">
                Minggu ke-{wNum}
              </h3>
              <table className="w-full text-left text-xs border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200 text-gray-800 font-bold border-b border-gray-400">
                    <th className="p-2 text-center w-8 border-r border-gray-400">NO</th>
                    <th className="p-2 w-36 border-r border-gray-400">HARI/TANGGAL</th>
                    <th className="p-2 border-r border-gray-400">PENERAPAN</th>
                    <th className="p-2 text-center w-12 border-r border-gray-400">SILA</th>
                    <th className="p-2 text-center w-36">DOKUMENTASI</th>
                  </tr>
                </thead>
                <tbody>
                  {weekActivities.map((act, index) => (
                    <tr key={act.id || index} className="border-b border-gray-300">
                      <td className="p-2 text-center font-bold border-r border-gray-400">{index + 1}</td>
                      <td className="p-2 font-semibold border-r border-gray-400">{formatDateFull(act.date)}</td>
                      <td className="p-2 border-r border-gray-400 font-medium text-gray-900">{act.title}</td>
                      <td className="p-2 text-center font-extrabold border-r border-gray-400 text-sm">
                        {act.sila}
                      </td>
                      {index === 0 ? (
                        <td rowSpan={weekActivities.length} className="p-2 text-center align-middle bg-gray-50">
                          {weeklySinglePhoto ? (
                            <img
                              src={weeklySinglePhoto}
                              alt={`Dokumentasi Minggu ${wNum}`}
                              className="w-32 h-24 object-cover mx-auto my-1 border border-gray-400 rounded-md"
                            />
                          ) : (
                            <span className="text-gray-400 italic">Belum ada foto</span>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        {/* Self Assessment & Reflection Box */}
        <div className="border border-gray-400 rounded-xl p-4 bg-gray-50 space-y-2">
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="font-bold text-xs uppercase text-gray-800">
              Refleksi & Alasan Penilaian:
            </span>
          </div>
          <div>
            <p className="text-xs italic text-gray-800">
              {reflection?.reason && reflection.reason.trim() !== ''
                ? `"${reflection.reason}"`
                : '(Belum ada refleksi yang ditulis)'}
            </p>
          </div>
        </div>

        {/* Signature Box */}
        <div className="pt-6 flex justify-between items-end text-xs font-semibold">
          <div className="text-center space-y-12">
            <p>Mengetahui,<br />Orang Tua / Wali Siswa</p>
            <p className="underline pt-8">( .................................... )</p>
          </div>

          <div className="text-center space-y-12">
            <p>Jakarta, 30 Agustus 2026<br />Siswa Penyusun,</p>
            <p className="underline font-bold text-gray-900 pt-8">{STUDENT_IDENTITY.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
