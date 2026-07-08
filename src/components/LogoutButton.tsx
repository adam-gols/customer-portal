'use client';

import { useState } from 'react';

export function LogoutButton() {
  const [submitting, setSubmitting] = useState(false);

  async function onLogout() {
    setSubmitting(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      // Full reload so session + styles re-render cleanly after cookie clear
      window.location.assign('/');
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
