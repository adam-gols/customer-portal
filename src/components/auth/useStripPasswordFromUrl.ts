'use client';

import { useEffect } from 'react';

/** Remove accidental password query params from the URL (e.g. native GET form submit). */
export function useStripPasswordFromUrl() {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('password')) {
      return;
    }

    url.searchParams.delete('password');
    const next = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, '', next);
  }, []);
}
