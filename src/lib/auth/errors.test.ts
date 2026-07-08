import { describe, expect, it } from 'vitest';
import { formatApiError } from './errors';

describe('formatApiError', () => {
  it('returns string errors directly', () => {
    expect(formatApiError('Invalid email or password', 'fallback')).toBe(
      'Invalid email or password',
    );
  });

  it('reads zod-style flattened errors', () => {
    expect(
      formatApiError({ formErrors: [], fieldErrors: { email: ['Invalid email'] } }, 'fallback'),
    ).toBe('Invalid email');
  });

  it('falls back when error shape is unknown', () => {
    expect(formatApiError({ foo: 'bar' }, 'fallback')).toBe('fallback');
  });
});
