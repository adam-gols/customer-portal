import { describe, expect, it } from 'vitest';
import { createSessionToken, getSessionExpiresAt, hashSessionToken } from './session';

describe('auth/session', () => {
  it('creates url-safe session tokens', () => {
    const token = createSessionToken();
    expect(token).toBeTypeOf('string');
    // base64url should not contain `/` or `+`
    expect(token).not.toContain('/');
    expect(token).not.toContain('+');
  });

  it('hashes session tokens deterministically', () => {
    const token = 'test-token';
    const h1 = hashSessionToken(token);
    const h2 = hashSessionToken(token);
    expect(h1).toBe(h2);
    expect(h1).toMatch(/^[0-9a-f]{64}$/);
  });

  it('expires sessions 30 days from now', () => {
    const now = new Date('2026-01-01T00:00:00.000Z');
    const expiresAt = getSessionExpiresAt(now);
    const diffMs = expiresAt.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeGreaterThanOrEqual(29.99);
    expect(diffDays).toBeLessThanOrEqual(30.01);
  });
});
