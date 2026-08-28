import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLoginModal from '@/components/AdminLoginModal';
import { AdminProvider } from '@/context/AdminContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PORTOFOLIO "Saya Berpancasila" - Davy Akbar Pahlevi',
  description: 'Portofolio digital diary kegiatan sehari-hari yang menunjukkan penerapan nilai-nilai Pancasila oleh Davy Akbar Pahlevi (SMK Negeri 21 Jakarta).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-gray-900 min-h-screen flex flex-col antialiased`}>
        <AdminProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <AdminLoginModal />
        </AdminProvider>
      </body>
    </html>
  );
}
