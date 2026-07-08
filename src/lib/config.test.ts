import { describe, expect, it } from 'vitest';
import { getConfig, getMissingSecrets } from './config';

describe('config', () => {
  it('loads required APP_ENV with defaults', () => {
    const config = getConfig({ APP_ENV: 'development', APP_PORT: '3000' });
    expect(config.appEnv).toBe('development');
    expect(config.appPort).toBe(3000);
  });

  it('reports optional secrets not yet configured', () => {
    const config = getConfig({ APP_ENV: 'development' });
    const missing = getMissingSecrets(config);
    expect(missing).toContain('DATABASE_URL');
    expect(missing).toContain('STRIPE_SECRET_KEY');
  });
});
