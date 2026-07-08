import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getConfig } from '@/lib/config';
import { getDb } from '@/lib/db';
import { SESSION_COOKIE_NAME, getUserFromSessionToken } from '@/lib/auth/session';

export async function GET() {
  const config = getConfig();
  if (!config.databaseUrl) {
    return NextResponse.json({ user: null });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const db = getDb(config.databaseUrl);
  const user = await getUserFromSessionToken({ db, token });
  return NextResponse.json({ user });
}
