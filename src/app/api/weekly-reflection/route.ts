import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let reflection = await prisma.weeklyReflection.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (!reflection) {
      reflection = await prisma.weeklyReflection.create({
        data: {
          month: 'Agustus',
          year: 2026,
          averageScore: 8.5,
          reason: 'Saya telah berusaha menjalankan berbagai kegiatan positif yang mencerminkan nilai-nilai Pancasila selama bulan ini.',
        },
      });
    }

    return NextResponse.json(reflection);
  } catch (error) {
    console.error('Error fetching monthly reflection:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data refleksi bulanan' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { averageScore, reason, month, year } = body;

    let reflection = await prisma.weeklyReflection.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (reflection) {
      reflection = await prisma.weeklyReflection.update({
        where: { id: reflection.id },
        data: {
          averageScore: parseFloat(averageScore),
          reason,
          month: month || reflection.month,
          year: year ? parseInt(year, 10) : reflection.year,
        },
      });
    } else {
      reflection = await prisma.weeklyReflection.create({
        data: {
          averageScore: parseFloat(averageScore),
          reason,
          month: month || 'Agustus',
          year: year ? parseInt(year, 10) : 2026,
        },
      });
    }

    return NextResponse.json(reflection);
  } catch (error) {
    console.error('Error updating monthly reflection:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui refleksi bulanan' },
      { status: 500 }
    );
  }
}
