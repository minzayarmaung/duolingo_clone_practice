import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import path from 'path';

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

export async function GET() {
  const imageDirectory = path.join(process.cwd(), 'public', 'practice-images');
  try {
    const files = await readdir(imageDirectory);
    const images = files.filter((file) => imageExtensions.has(path.extname(file).toLowerCase())).map((file) => `/practice-images/${encodeURIComponent(file)}`);
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
