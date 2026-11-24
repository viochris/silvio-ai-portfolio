import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';

const RESUME_FILENAME = 'Silvio-Christian-Joe-resume.pdf';

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'public', RESUME_FILENAME);
    const pdfBuffer = await readFile(filePath);
    const isDownload = request.nextUrl.searchParams.get('download') === '1';

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(pdfBuffer.byteLength),
        'Content-Disposition': `${isDownload ? 'attachment' : 'inline'}; filename="${RESUME_FILENAME}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Resume file not found' }, { status: 404 });
  }
}
