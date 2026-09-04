import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodNumber = parseInt(searchParams.get('period') || '1', 10);
    const year = parseInt(searchParams.get('year') || '2026', 10);

    let reflection = await prisma.weeklyReflection.findFirst({
      where: { periodNumber, year },
    });

    if (!reflection) {
      reflection = await prisma.weeklyReflection.create({
        data: {
          periodNumber,
          year,
          month: 'Agustus',
          averageScore: 8.3,
          reason: '',
        },
      });
    }

    return NextResponse.json(reflection);
  } catch (error) {
    console.error('Error fetching reflection:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data refleksi' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { averageScore, reason, periodNumber = 1, year = 2026 } = body;

    const updatedReason = reason !== undefined ? reason : '';
    const computedPeriod = parseInt(periodNumber, 10);

    const reflection = await prisma.weeklyReflection.upsert({
      where: {
        periodNumber_year: {
          periodNumber: computedPeriod,
          year: parseInt(year, 10),
        },
      },
      update: {
        averageScore: averageScore !== undefined ? parseFloat(averageScore) : 8.3,
        reason: updatedReason,
      },
      create: {
        periodNumber: computedPeriod,
        year: parseInt(year, 10),
        month: 'Agustus',
        averageScore: averageScore !== undefined ? parseFloat(averageScore) : 8.3,
        reason: updatedReason,
      },
    });

    return NextResponse.json(reflection);
  } catch (error) {
    console.error('Error updating reflection:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui refleksi' },
      { status: 500 }
    );
  }
}
