import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <header className="header">
        <Link href="/">
          <Logo variant="secondary-light" height={48} />
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
