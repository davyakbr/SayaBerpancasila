import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month') || 'Agustus';
    const year = parseInt(searchParams.get('year') || '2026', 10);

    const scores = await prisma.weeklyScore.findMany({
      where: { month, year },
    });

    return NextResponse.json(scores);
  } catch (error) {
    console.error('Error fetching weekly scores:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data penilaian minggu' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { weekNumber, score, month = 'Agustus', year = 2026 } = body;

    if (!weekNumber || score === undefined) {
      return NextResponse.json(
        { error: 'Minggu ke dan nilai wajib diisi' },
        { status: 400 }
      );
    }

    const updatedScore = await prisma.weeklyScore.upsert({
      where: {
        weekNumber_month_year: {
          weekNumber: parseInt(weekNumber, 10),
          month,
          year: parseInt(year, 10),
        },
      },
      update: {
        score: parseFloat(score),
      },
      create: {
        weekNumber: parseInt(weekNumber, 10),
        month,
        year: parseInt(year, 10),
        score: parseFloat(score),
      },
    });

    return NextResponse.json(updatedScore);
  } catch (error) {
    console.error('Error updating weekly score:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui nilai minggu' },
      { status: 500 }
    );
  }
}
