import React from 'react';
import Link from 'next/link';
import { STUDENT_IDENTITY, SILA_LIST } from '@/lib/constants';
import { ArrowRight, BookOpen, Sparkles, ShieldCheck, School } from 'lucide-react';

export default function CoverPage() {
  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto py-4">
      {/* Cover Card Container */}
      <div className="bg-gradient-to-b from-white via-rose-50/30 to-amber-50/20 rounded-3xl p-6 sm:p-12 shadow-xl border border-rose-100/80 relative overflow-hidden text-center space-y-10">
        {/* Background Decorative Accents */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-900/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Garuda Pancasila Emblem Header */}
        <div className="relative z-10 space-y-4">
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-white rounded-3xl p-3 shadow-maroon/20 shadow-lg border border-amber-300 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <img
              src="/images/garuda.jpg"
              alt="Garuda Pancasila"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-900/10 text-rose-900 text-xs font-extrabold uppercase tracking-widest border border-rose-900/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Jurnal Portofolio Digital PPKn
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-rose-950 tracking-tight">
              PORTOFOLIO
            </h1>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-600 tracking-wide">
              "Saya Berpancasila"
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Dokumentasi diary kegiatan sehari-hari yang menunjukkan penerapan dan pengamalan nilai-nilai luhur Pancasila.
            </p>
          </div>
        </div>

        {/* Student Profile Identity Section */}
        <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-rose-100 shadow-soft max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* Profile Photo */}
          <div className="w-32 h-32 mx-auto sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-rose-900 shadow-md relative group">
            <img
              src="/images/profile.jpg"
              alt={STUDENT_IDENTITY.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 to-transparent flex items-end justify-center p-2">
              <span className="text-[10px] text-amber-300 font-bold tracking-wider uppercase">
                Fase F PPLG
              </span>
            </div>
          </div>

          {/* Student Info Details */}
          <div className="sm:col-span-2 text-left space-y-2">
            <div className="border-b border-gray-100 pb-2">
              <span className="text-xs text-rose-700 font-bold uppercase tracking-wider block">Identitas Siswa</span>
              <h3 className="text-xl font-extrabold text-gray-900">{STUDENT_IDENTITY.name}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 font-medium">
              <p><strong className="text-gray-900">No. Absen:</strong> {STUDENT_IDENTITY.absen}</p>
              <p><strong className="text-gray-900">Kelas:</strong> {STUDENT_IDENTITY.kelas}</p>
              <p><strong className="text-gray-900">NIS:</strong> {STUDENT_IDENTITY.nis}</p>
              <p><strong className="text-gray-900">Tahun:</strong> {STUDENT_IDENTITY.tahun}</p>
            </div>
            <p className="text-xs font-semibold text-rose-900 pt-1 flex items-center gap-1.5">
              <School className="w-4 h-4 text-rose-800" /> {STUDENT_IDENTITY.sekolah}
            </p>
          </div>
        </div>

        {/* 5 Sila Breakdown List */}
        <div className="relative z-10 space-y-4 pt-2">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl uppercase tracking-wider">
              Daftar 5 Sila Pancasila
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-left">
            {[1, 2, 3, 4, 5].map((sNum) => {
              const info = SILA_LIST[sNum];
              return (
                <div
                  key={sNum}
                  className="bg-white rounded-2xl p-3.5 border border-rose-100 shadow-xs hover:border-amber-400 hover:shadow-soft transition-all space-y-3 flex flex-col justify-between group overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                        {info.roman}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-900 text-white shrink-0">
                        Sila {sNum}
                      </span>
                    </div>

                    <div className="w-16 h-16 mx-auto bg-gray-50 rounded-xl p-1.5 border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <img
                        src={info.iconPath}
                        alt={info.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <h4 className="font-bold text-gray-900 text-[11px] sm:text-xs text-center leading-snug break-words">
                      {info.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-500 text-center font-medium">
                    {info.symbolName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button "Mulai Portofolio" */}
        <div className="relative z-10 pt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-900 via-maroon-900 to-rose-950 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-maroon hover:shadow-xl hover:scale-105 transition-all duration-300 group border border-amber-400/40"
          >
            <BookOpen className="w-5 h-5 text-amber-300" />
            <span>Mulai Portofolio</span>
            <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
