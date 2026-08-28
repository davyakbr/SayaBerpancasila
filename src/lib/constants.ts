export interface SilaInfo {
  number: number;
  roman: string;
  title: string;
  symbolName: string;
  iconPath: string;
  color: string;
  bgColor: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  description: string;
}

export const SILA_LIST: Record<number, SilaInfo> = {
  1: {
    number: 1,
    roman: 'I',
    title: 'Ketuhanan Yang Maha Esa',
    symbolName: 'Bintang Emas',
    iconPath: '/images/sila/sila1.webp',
    color: '#EAB308',
    bgColor: 'bg-amber-500/10',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    borderColor: 'border-amber-400',
    textColor: 'text-amber-700',
    description: 'Bintang emas melambangkan cahaya kerohanian bagi setiap manusia dan pertanda dasar ketuhanan.',
  },
  2: {
    number: 2,
    roman: 'II',
    title: 'Kemanusiaan Yang Adil dan Beradab',
    symbolName: 'Rantai Emas',
    iconPath: '/images/sila/sila2.webp',
    color: '#E11D48',
    bgColor: 'bg-rose-500/10',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    borderColor: 'border-rose-400',
    textColor: 'text-rose-700',
    description: 'Rantai emas melambangkan hubungan antarmanusia yang saling membutuhkan dan bersatu.',
  },
  3: {
    number: 3,
    roman: 'III',
    title: 'Persatuan Indonesia',
    symbolName: 'Pohon Beringin',
    iconPath: '/images/sila/sila3.webp',
    color: '#059669',
    bgColor: 'bg-emerald-500/10',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-700',
    description: 'Pohon beringin melambangkan tempat berteduh, perlindungan, dan kesatuan bangsa Indonesia.',
  },
  4: {
    number: 4,
    roman: 'IV',
    title: 'Kerakyatan Yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
    symbolName: 'Kepala Banteng',
    iconPath: '/images/sila/sila4.webp',
    color: '#2563EB',
    bgColor: 'bg-blue-500/10',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-700',
    description: 'Kepala banteng melambangkan hewan sosial yang suka berkumpul dan bermusyawarah.',
  },
  5: {
    number: 5,
    roman: 'V',
    title: 'Keadilan Sosial Bagi Seluruh Rakyat Indonesia',
    symbolName: 'Padi & Kapas',
    iconPath: '/images/sila/sila5.webp',
    color: '#7C3AED',
    bgColor: 'bg-purple-500/10',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    borderColor: 'border-purple-400',
    textColor: 'text-purple-700',
    description: 'Padi dan kapas melambangkan pangan dan sandang sebagai syarat utama kemakmuran.',
  },
};

export const STUDENT_IDENTITY = {
  name: 'Davy Akbar Pahlevi',
  absen: 6,
  kelas: 'XII PPLG',
  nis: '12680',
  sekolah: 'SMK Negeri 21 Jakarta',
  tahun: 2026,
  fase: 'FASE F LANJUTAN PPLG',
};
