'use client';

import React, { useState, useEffect } from 'react';
import { ActivityData, WeeklyReflectionData } from '@/types';
import { STUDENT_IDENTITY } from '@/lib/constants';
import { useAdmin } from '@/context/AdminContext';
import { Printer, Edit3, Check, Calendar, Award, ShieldCheck, Star } from 'lucide-react';

interface WeeklyTableProps {
  activities: ActivityData[];
  reflection: WeeklyReflectionData | null;
  onSaveReflection?: (data: { averageScore: number; reason: string; periodNumber?: number }) => Promise<void>;
  onExportPDF?: () => void;
}

export default function WeeklyTable({
  activities,
  reflection,
  onSaveReflection,
  onExportPDF,
}: WeeklyTableProps) {
  const { isAdmin } = useAdmin();

  // State for weekly scores (Record<weekNumber, score>)
  const [weeklyScores, setWeeklyScores] = useState<Record<number, number>>({
    1: 8.0,
    2: 7.0,
  });

  const [editingWeekNum, setEditingWeekNum] = useState<number | null>(null);
  const [editingWeekScoreInput, setEditingWeekScoreInput] = useState<number>(8.0);

  // State for reflections per 4-week cycle (Record<cycleNumber, reason>)
  const [cycleReflections, setCycleReflections] = useState<Record<number, string>>({
    1: reflection?.reason !== undefined ? reflection.reason : '',
  });
  const [editingCycleNum, setEditingCycleNum] = useState<number | null>(null);
  const [reasonInput, setReasonInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (reflection?.reason !== undefined) {
      setCycleReflections((prev) => ({
        ...prev,
        [reflection.periodNumber || 1]: reflection.reason,
      }));
    }
  }, [reflection]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch('/api/weekly-score');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const map: Record<number, number> = { 1: 8.0, 2: 7.0 };
            data.forEach((item: any) => {
              map[item.weekNumber] = item.score;
            });
            setWeeklyScores(map);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchScores();
  }, []);

  const handleSaveWeekScore = async (wNum: number) => {
    try {
      const res = await fetch('/api/weekly-score', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weekNumber: wNum, score: editingWeekScoreInput }),
      });

      if (res.ok) {
        setWeeklyScores((prev) => ({ ...prev, [wNum]: editingWeekScoreInput }));
        setEditingWeekNum(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveCycleReflection = async (cNum: number) => {
    if (!onSaveReflection) return;
    setSaving(true);
    try {
      await onSaveReflection({
        averageScore: 8.3,
        reason: reasonInput,
        periodNumber: cNum,
      });
      setCycleReflections((prev) => ({ ...prev, [cNum]: reasonInput }));
      setEditingCycleNum(null);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const formatDateFull = (dateStr: string | Date) => {
    const d = new Date(dateStr);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Group activities directly by Week Number
  const weeksMap: Record<number, ActivityData[]> = {};

  activities.forEach((act) => {
    const wNum = act.weekNumber || 1;
    if (!weeksMap[wNum]) weeksMap[wNum] = [];
    weeksMap[wNum].push(act);
  });

  const sortedWeekNumbers = Object.keys(weeksMap)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-rose-100/60 max-w-5xl mx-auto space-y-8">
      {/* Header Profile Identity */}
      <div className="flex flex-col items-center text-center space-y-4 pt-2">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl p-2 shadow-md border border-amber-200/60 flex items-center justify-center relative group">
          <img
            src="/images/garuda.jpg"
            alt="Garuda Pancasila"
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
            PORTOFOLIO <span className="text-blue-500">"Saya Berpancasila"</span>
          </h1>
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide mt-1">
            {STUDENT_IDENTITY.name}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wider uppercase">
            {STUDENT_IDENTITY.fase}
          </p>
          <p className="text-xs text-gray-400 font-mono mt-0.5">NIS: {STUDENT_IDENTITY.nis}</p>
        </div>
      </div>

      {/* Mode Status Bar & PDF Export */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
        {isAdmin ? (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 rounded-full font-semibold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mode Pengelolaan Admin Aktif</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs px-3.5 py-1.5 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Mode Lihat (Siswa / Publik)</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {onExportPDF && (
            <button
              onClick={onExportPDF}
              className="inline-flex items-center gap-2 border border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Download PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* SEQUENTIAL WEEKLY TABLES WITH REFLECTION AT EVERY MULTIPLE OF 4 WEEKS */}
      <div className="space-y-8">
        {sortedWeekNumbers.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-xs text-gray-500 italic">Belum ada kegiatan terdaftar.</p>
          </div>
        ) : (
          sortedWeekNumbers.map((wNum, idx) => {
            const weekActivities = weeksMap[wNum];
            const docPhotos = weekActivities
              .filter((a) => a.imageUrl)
              .map((a) => a.imageUrl as string);
            const weeklySinglePhoto = docPhotos.length > 0 ? docPhotos[0] : null;
            const currentWeekScore = weeklyScores[wNum] ?? (wNum === 2 ? 7.0 : 8.0);

            // Check if this week is a multiple of 4 OR the last week in the list
            const isMultipleOf4 = wNum % 4 === 0;
            const isLastWeek = idx === sortedWeekNumbers.length - 1;
            const showReflectionNow = isMultipleOf4 || (isLastWeek && sortedWeekNumbers.length < 4);

            // Calculate cycle index (1 for weeks 1-4, 2 for weeks 5-8, etc.)
            const cycleNum = Math.ceil(wNum / 4) || 1;
            const cycleReasonText = cycleReflections[cycleNum] ?? '';

            return (
              <React.Fragment key={wNum}>
                {/* WEEKLY TABLE CARD */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                  {/* Table Header per Week */}
                  <div className="bg-gray-50/80 px-6 py-3.5 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-rose-950 text-base sm:text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-rose-700" />
                        Minggu ke-{wNum}
                      </h4>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {weekActivities.length} Kegiatan Terdaftar
                    </span>
                  </div>

                  {/* Table Content */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-200 text-[11px]">
                          <th className="py-3 px-3 sm:px-4 text-center w-12 border-r border-gray-200">NO</th>
                          <th className="py-3 px-4 w-40 sm:w-48 border-r border-gray-200">HARI/TANGGAL</th>
                          <th className="py-3 px-4 border-r border-gray-200 min-w-[200px]">PENERAPAN</th>
                          <th className="py-3 px-3 text-center w-16 border-r border-gray-200">SILA</th>
                          <th className="py-3 px-4 text-center w-48">DOKUMENTASI MINGGUAN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800">
                        {weekActivities.map((act, index) => (
                          <tr key={act.id || index} className="hover:bg-rose-50/20 transition-colors">
                            <td className="py-3 px-3 text-center font-medium text-gray-500 border-r border-gray-200">
                              {index + 1}
                            </td>
                            <td className="py-3 px-4 font-semibold text-gray-900 border-r border-gray-200">
                              {formatDateFull(act.date)}
                            </td>
                            <td className="py-3 px-4 border-r border-gray-200">
                              <p className="font-semibold text-gray-900 leading-snug">{act.title}</p>
                            </td>
                            <td className="py-3 px-3 text-center border-r border-gray-200 font-bold text-gray-800">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 font-bold border border-gray-300">
                                {act.sila}
                              </span>
                            </td>

                            {/* 1 Photo Documentation for this Week */}
                            {index === 0 ? (
                              <td
                                rowSpan={weekActivities.length}
                                className="py-4 px-4 text-center align-middle bg-gray-50/40"
                              >
                                {weeklySinglePhoto ? (
                                  <div className="space-y-2">
                                    <div className="w-36 h-28 sm:w-44 sm:h-32 mx-auto rounded-xl overflow-hidden border border-gray-300 shadow-sm relative group">
                                      <img
                                        src={weeklySinglePhoto}
                                        alt={`Dokumentasi Minggu ${wNum}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium italic">
                                      Foto Dokumentasi Minggu ke-{wNum}
                                    </p>
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-400 font-medium italic">Belum ada foto</span>
                                )}
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* WEEKLY SELF-ASSESSMENT SCORE (PENILAIAN DIRI MINGGUAN 1-10) */}
                  <div className="bg-gray-50/70 p-4 sm:p-5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          Penilaian Diri Minggu ke-{wNum} (1-10)
                        </h4>
                        <p className="text-[11px] text-gray-500 italic">
                          Nilai kepatuhan penerapan Pancasila minggu ke-{wNum}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {editingWeekNum === wNum && isAdmin ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={editingWeekScoreInput}
                            onChange={(e) => setEditingWeekScoreInput(parseFloat(e.target.value))}
                            className="w-20 text-center font-black text-xl text-blue-700 bg-white border border-blue-300 rounded-lg py-1 px-2"
                          />
                          <button
                            onClick={() => handleSaveWeekScore(wNum)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingWeekNum(null)}
                            className="px-2 py-1 text-gray-500 text-xs"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-xl font-black text-blue-700 text-lg sm:text-xl">
                            {currentWeekScore.toFixed(1)} <span className="text-xs font-semibold text-gray-500">/ 10</span>
                          </div>
                          {isAdmin && (
                            <button
                              onClick={() => {
                                setEditingWeekNum(wNum);
                                setEditingWeekScoreInput(currentWeekScore);
                              }}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                            >
                              Edit Nilai (Admin)
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* REFLECTION BOX DISPLAYED AT KELIPATAN MINGGU 4 & GIVEN A CLEAR DISTANCE/GAP FOR NEXT WEEKS */}
                {showReflectionNow && (
                  <div className="pt-2 pb-6 space-y-8">
                    <div className="border border-gray-200 rounded-2xl bg-gray-50/80 p-6 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                          Refleksi & Alasan Penilaian
                        </h4>
                        {isAdmin && editingCycleNum !== cycleNum && onSaveReflection && (
                          <button
                            onClick={() => {
                              setEditingCycleNum(cycleNum);
                              setReasonInput(cycleReasonText);
                            }}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Refleksi (Admin)
                          </button>
                        )}
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                        <p className="text-xs font-bold text-gray-700 uppercase">
                          Alasan Penilaian & Refleksi:
                        </p>
                        {editingCycleNum === cycleNum && isAdmin ? (
                          <div className="space-y-3">
                            <textarea
                              rows={4}
                              placeholder="Tuliskan alasan refleksi di sini..."
                              value={reasonInput}
                              onChange={(e) => setReasonInput(e.target.value)}
                              className="w-full text-xs sm:text-sm text-gray-800 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingCycleNum(null)}
                                className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg text-xs font-medium"
                              >
                                Batal
                              </button>
                              <button
                                onClick={() => handleSaveCycleReflection(cycleNum)}
                                disabled={saving}
                                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" />
                                {saving ? 'Menyimpan...' : 'Simpan Refleksi'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                            {cycleReasonText && cycleReasonText.trim() !== '' ? (
                              `"${cycleReasonText}"`
                            ) : (
                              <span className="text-gray-400 font-normal">
                                (Belum ada refleksi yang ditulis)
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Generous visual separator gap before the next 4-week block begins */}
                    {!isLastWeek && (
                      <div className="pt-6 pb-2 border-b-2 border-dashed border-rose-200/80"></div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
}
