import { LoginForm } from '@/components/auth/LoginForm';
import { AlreadySignedIn } from '@/components/auth/AlreadySignedIn';
import { getCurrentUser } from '@/lib/auth/current-user';

type LoginPageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();
  if (user) {
    return <AlreadySignedIn email={user.email} />;
  }

  const params = await searchParams;
  const defaultEmail = params.email?.trim() ?? '';

  return <LoginForm defaultEmail={defaultEmail} />;
}
