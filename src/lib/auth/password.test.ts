import { describe, expect, it } from 'vitest';
import { hashPassword, normalizeEmail, verifyPassword } from './password';

describe('auth/password', () => {
  it('hashes and verifies passwords', async () => {
    const password = 'Correct Horse Battery Staple';
    const passwordHash = await hashPassword(password);

    expect(passwordHash).toBeTypeOf('string');
    expect(passwordHash).not.toBe(password);

    await expect(verifyPassword(password, passwordHash)).resolves.toBe(true);
    await expect(verifyPassword('wrong-password', passwordHash)).resolves.toBe(false);
  });

  it('normalizes email addresses', () => {
    expect(normalizeEmail('  Test@Example.com ')).toBe('test@example.com');
  });
});
