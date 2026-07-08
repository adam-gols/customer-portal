import { Logo } from '@/components/Logo';
import { getConfig, getMissingSecrets } from '@/lib/config';

export default function HomePage() {
  const config = getConfig();
  const missingSecrets = getMissingSecrets(config);

  return (
    <div className="page">
      <header className="header">
        <Logo variant="secondary-light" height={48} />
      </header>

      <main className="main">
        <p className="eyebrow">GOLS Connect</p>
        <h1>Your orders. One place.</h1>
        <p className="lead">
          Sign up, view your orders, and purchase GOLS products — all in one customer portal.
        </p>

        <div className="actions">
          <span className="gols-btn-primary">Sign in (coming soon)</span>
          <span className="gols-btn-secondary">View orders (coming soon)</span>
        </div>

        {missingSecrets.length > 0 && config.appEnv === 'development' && (
          <aside className="dev-notice" role="status">
            <strong>Dev setup:</strong> Add these to your 1Password Environment when ready:{' '}
            {missingSecrets.join(', ')}. The app runs without them for now.
          </aside>
        )}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Game On Live Studio</p>
      </footer>
    </div>
  );
}
