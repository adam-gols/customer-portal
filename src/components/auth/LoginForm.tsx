'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';

function formatError(error: unknown): string {
  if (typeof error === 'string') return error;
  return 'Log in failed';
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        setError(formatError(payload?.error));
        return;
      }

      window.location.assign('/');
    } catch {
      setError('Unexpected error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '2.5rem 1.25rem' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>Log in</h1>
      <p style={{ marginBottom: '1.5rem', color: 'var(--gols-pumice-grey)' }}>
        Sign in to view your orders and purchases.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 10,
              border: '1px solid var(--gols-gallery-grey)',
            }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={8}
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 10,
              border: '1px solid var(--gols-gallery-grey)',
            }}
          />
        </label>

        {error && (
          <div
            style={{
              padding: '0.85rem 0.95rem',
              background: 'var(--gols-gallery-grey)',
              borderLeft: '4px solid var(--gols-cardinal-red)',
            }}
          >
            {error}
          </div>
        )}

        <button
          className="gols-btn-primary"
          type="submit"
          disabled={submitting}
          style={{ width: 'fit-content' }}
        >
          {submitting ? 'Signing in…' : 'Log in'}
        </button>

        <p style={{ marginTop: '0.5rem' }}>
          Need an account?{' '}
          <Link href="/signup" style={{ color: 'var(--gols-zodiac-blue)' }}>
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
