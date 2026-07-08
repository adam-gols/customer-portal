import { cookies } from 'next/headers';
import { getConfig } from '@/lib/config';
import { getDb } from '@/lib/db';
import { SESSION_COOKIE_NAME, getUserFromSessionToken, type UserSummary } from '@/lib/auth/session';

export async function getCurrentUser(): Promise<UserSummary | null> {
  const config = getConfig();
  if (!config.databaseUrl) {
    return null;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const db = getDb(config.databaseUrl);
  return getUserFromSessionToken({ db, token });
}
