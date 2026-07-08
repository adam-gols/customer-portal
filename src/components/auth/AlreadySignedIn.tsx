import Link from 'next/link';
import { LogoutButton } from '@/components/LogoutButton';

type AlreadySignedInProps = {
  email: string;
};

export function AlreadySignedIn({ email }: AlreadySignedInProps) {
  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '2.5rem 1.25rem' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>You&apos;re already signed in</h1>
      <p style={{ marginBottom: '1.5rem', color: 'var(--gols-pumice-grey)' }}>
        Signed in as <strong>{email}</strong>. Log out first if you want to use a different account.
      </p>
      <div className="actions">
        <Link className="gols-btn-primary" href="/">
          Go to home
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
