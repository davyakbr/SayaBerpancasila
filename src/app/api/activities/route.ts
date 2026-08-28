import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function calculateWeekNumber(dateStr: string | Date): number {
  const day = new Date(dateStr).getDate();
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sila = searchParams.get('sila');
    const search = searchParams.get('search');
    const week = searchParams.get('week');
    const month = searchParams.get('month');

    const where: any = {};

    if (sila && sila !== 'all') {
      where.sila = parseInt(sila, 10);
    }

    if (week && week !== 'all') {
      where.weekNumber = parseInt(week, 10);
    }

    if (search) {
      where.title = { contains: search };
    }

    let activities = await prisma.activity.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    // Filter by month in memory (1-indexed month: 1=Jan, 8=Aug, etc.)
    if (month && month !== 'all') {
      const targetMonth = parseInt(month, 10) - 1; // JS Date 0-indexed month
      activities = activities.filter((act) => new Date(act.date).getMonth() === targetMonth);
    }

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data kegiatan' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, sila, weekNumber, imageUrl } = body;

    if (!title || !date || !sila) {
      return NextResponse.json(
        { error: 'Judul, tanggal, dan Sila wajib diisi' },
        { status: 400 }
      );
    }

    const computedWeek = weekNumber ? parseInt(weekNumber, 10) : calculateWeekNumber(date);

    const newActivity = await prisma.activity.create({
      data: {
        title,
        date: new Date(date),
        sila: parseInt(sila, 10),
        weekNumber: computedWeek,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Gagal membuat kegiatan baru' },
      { status: 500 }
    );
  }
}
