'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onLogout() {
    setSubmitting(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <button type="button" className="gols-btn-secondary" onClick={onLogout} disabled={submitting}>
      {submitting ? 'Signing out…' : 'Log out'}
    </button>
  );
}
