import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { LogoutButton } from '@/components/LogoutButton';
import { getCurrentUser } from '@/lib/auth/current-user';
import { getConfig, getMissingSecrets } from '@/lib/config';

export default async function HomePage() {
  const config = getConfig();
  const missingSecrets = getMissingSecrets(config);
  const user = await getCurrentUser();

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

        {user ? (
          <div className="actions">
            <p style={{ margin: 0 }}>
              Signed in as <strong>{user.email}</strong>
            </p>
            <span className="gols-btn-secondary">View orders (coming soon)</span>
            <LogoutButton />
          </div>
        ) : (
          <div className="actions">
            <Link className="gols-btn-primary" href="/login">
              Log in
            </Link>
            <Link className="gols-btn-secondary" href="/signup">
              Create account
            </Link>
          </div>
        )}

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
