import React from 'react';
import { STUDENT_IDENTITY } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-rose-950 text-rose-100 border-t border-rose-900/40 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md flex items-center justify-center">
                <img src="/images/garuda.jpg" alt="Garuda" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                SAYA <span className="text-amber-400">BERPANCASILA</span>
              </span>
            </div>
            <p className="text-rose-200/80 text-sm leading-relaxed mb-4">
              Portofolio digital jurnal kegiatan harian yang mencerminkan pengamalan nilai-nilai luhur Pancasila dalam kehidupan siswa sehari-hari.
            </p>
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-500/30">
              {STUDENT_IDENTITY.sekolah} • {STUDENT_IDENTITY.tahun}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Identitas Siswa
            </h4>
            <ul className="space-y-2 text-sm text-rose-200/80">
              <li><strong className="text-white">Nama:</strong> {STUDENT_IDENTITY.name}</li>
              <li><strong className="text-white">No. Absen:</strong> {STUDENT_IDENTITY.absen}</li>
              <li><strong className="text-white">Kelas:</strong> {STUDENT_IDENTITY.kelas} ({STUDENT_IDENTITY.fase})</li>
              <li><strong className="text-white">NIS:</strong> {STUDENT_IDENTITY.nis}</li>
              <li><strong className="text-white">Sekolah:</strong> {STUDENT_IDENTITY.sekolah}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> 5 Sila Pancasila
            </h4>
            <ol className="space-y-1.5 text-xs text-rose-200/80 list-decimal list-inside">
              <li>Ketuhanan Yang Maha Esa</li>
              <li>Kemanusiaan Yang Adil dan Beradab</li>
              <li>Persatuan Indonesia</li>
              <li>Kerakyatan Yang Dipimpin oleh Hikmat...</li>
              <li>Keadilan Sosial Bagi Seluruh Rakyat Indonesia</li>
            </ol>
          </div>
        </div>

        <div className="border-t border-rose-900/60 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-rose-300/70">
          <p>© {STUDENT_IDENTITY.tahun} SAYA BERPANCASILA. Tugas Portofolio Digital PPKn / PPLG.</p>
          <p className="mt-2 sm:mt-0 font-medium">SMK Negeri 21 Jakarta • Davy Akbar Pahlevi</p>
        </div>
      </div>
    </footer>
  );
}
