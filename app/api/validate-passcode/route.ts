import passcodeData from '../../data/passcode.json';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body?.passcode === passcodeData.passcode) {
      return NextResponse.json({ valid: true });
    }
  } catch {
    // ignore
  }

  return NextResponse.json({ valid: false }, { status: 401 });
}
