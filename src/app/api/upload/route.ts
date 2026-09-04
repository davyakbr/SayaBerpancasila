import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Tidak ada file yang diunggah' },
        { status: 400 }
      );
    }

    // Convert file to Base64 Data URL (100% safe for Vercel serverless read-only filesystem)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    const imageUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ imageUrl, success: true });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Gagal mengunggah foto. Pastikan ukuran foto di bawah 5MB.' },
      { status: 500 }
    );
  }
}
