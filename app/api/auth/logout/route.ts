import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getConfig } from '@/lib/config';
import { getDb } from '@/lib/db';
import { SESSION_COOKIE_NAME, deleteSessionByToken } from '@/lib/auth/session';

export async function POST() {
  const config = getConfig();
  const res = NextResponse.json({ ok: true });

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token && config.databaseUrl) {
    const db = getDb(config.databaseUrl);
    await deleteSessionByToken({ db, token });
  }

  res.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return res;
}
