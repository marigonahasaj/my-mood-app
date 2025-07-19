import { NextRequest, NextResponse } from 'next/server';
import { paid_users } from '../../../utils/payment';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: "Missing email parameter" },
      { status: 400 }
    );
  }

  return NextResponse.json({ paid: paid_users.has(email) });
} 