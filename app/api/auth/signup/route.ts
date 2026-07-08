import { NextResponse } from 'next/server';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { getConfig } from '@/lib/config';
import { getDb } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { SESSION_COOKIE_NAME, createSession } from '@/lib/auth/session';
import { hashPassword, normalizeEmail } from '@/lib/auth/password';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(req: Request) {
  const config = getConfig();
  if (!config.databaseUrl) {
    return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const normalizedEmail = normalizeEmail(email);

  const db = getDb(config.databaseUrl);

  const existing = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);

  const inserted = await db
    .insert(users)
    .values({
      email: normalizedEmail,
      passwordHash,
    })
    .returning({ id: users.id });

  const userId = inserted[0]?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }

  const { token, expiresAt } = await createSession({ db, userId });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return res;
}
