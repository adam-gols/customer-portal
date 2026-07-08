'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { formatApiError } from '@/lib/auth/errors';

type SignupFormProps = {
  defaultEmail?: string;
};

export function SignupForm({ defaultEmail = '' }: SignupFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loginHref = email.trim() ? `/login?email=${encodeURIComponent(email.trim())}` : '/login';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setError(formatApiError(payload?.error, 'Sign up failed. Please check your details.'));
        return;
      }

      const me = await fetch('/api/auth/me', { credentials: 'same-origin' });
      const meData = await me.json().catch(() => null);
      if (!meData?.user) {
        setError('Account created, but your session was not saved. Please log in.');
        return;
      }

      setSuccess(true);
      window.setTimeout(() => {
        window.location.assign('/');
      }, 400);
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '2.5rem 1.25rem' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>Create your account</h1>
      <p style={{ marginBottom: '1.5rem', color: 'var(--gols-pumice-grey)' }}>
        Sign up to view your orders and manage purchases.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
        {error && (
          <div className="auth-alert auth-alert-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-alert auth-alert-success" role="status">
            Account created. Redirecting…
          </div>
        )}

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Email</span>
          <input
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            disabled={submitting || success}
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
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={8}
            disabled={submitting || success}
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 10,
              border: '1px solid var(--gols-gallery-grey)',
            }}
          />
        </label>

        <button
          className="gols-btn-primary"
          type="submit"
          disabled={submitting || success}
          style={{ width: 'fit-content' }}
        >
          {submitting ? 'Creating…' : success ? 'Account created' : 'Create account'}
        </button>

        <p style={{ marginTop: '0.5rem' }}>
          Already have an account?{' '}
          <Link href={loginHref} style={{ color: 'var(--gols-zodiac-blue)' }}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
