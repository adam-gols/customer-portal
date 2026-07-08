import crypto from 'crypto';
import { and, eq, gt } from 'drizzle-orm';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users, sessions } from '@/lib/db/schema';

export const SESSION_COOKIE_NAME = 'gols_session';

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export type UserSummary = Pick<InferSelectModel<typeof users>, 'id' | 'email'>;
export type SessionSummary = Pick<InferInsertModel<typeof sessions>, 'userId' | 'expiresAt'>;

export function createSessionToken(): string {
  // URL-safe random token
  return crypto.randomBytes(32).toString('base64url');
}

export function hashSessionToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function getSessionExpiresAt(now = new Date()): Date {
  return new Date(now.getTime() + SESSION_TTL_MS);
}

export async function createSession({
  db,
  userId,
  now = new Date(),
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
  userId: number;
  now?: Date;
}): Promise<{ token: string; expiresAt: Date }> {
  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = getSessionExpiresAt(now);

  await db.insert(sessions).values({
    userId,
    tokenHash,
    expiresAt,
  });

  return { token, expiresAt };
}

export async function getUserFromSessionToken({
  db,
  token,
  now = new Date(),
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
  token: string;
  now?: Date;
}): Promise<UserSummary | null> {
  const tokenHash = hashSessionToken(token);

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, now)))
    .limit(1);

  return rows[0] ?? null;
}

export async function deleteSessionByToken({
  db,
  token,
  now = new Date(),
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
  token: string;
  now?: Date;
}): Promise<void> {
  const tokenHash = hashSessionToken(token);
  await db
    .delete(sessions)
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, now)));
}
