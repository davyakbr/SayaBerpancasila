import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function calculateWeekNumber(dateStr: string | Date): number {
  const day = new Date(dateStr).getDate();
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
    });

    if (!activity) {
      return NextResponse.json(
        { error: 'Kegiatan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error fetching activity detail:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail kegiatan' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, date, sila, weekNumber, imageUrl } = body;

    const computedWeek = weekNumber ? parseInt(weekNumber, 10) : calculateWeekNumber(date);

    const updatedActivity = await prisma.activity.update({
      where: { id: params.id },
      data: {
        title,
        date: new Date(date),
        sila: parseInt(sila, 10),
        weekNumber: computedWeek,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
      },
    });

    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui kegiatan' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.activity.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Kegiatan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus kegiatan' },
      { status: 500 }
    );
  }
}
