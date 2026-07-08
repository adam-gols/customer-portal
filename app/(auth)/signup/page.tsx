import { SignupForm } from '@/components/auth/SignupForm';
import { AlreadySignedIn } from '@/components/auth/AlreadySignedIn';
import { getCurrentUser } from '@/lib/auth/current-user';

type SignupPageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const user = await getCurrentUser();
  if (user) {
    return <AlreadySignedIn email={user.email} />;
  }

  const params = await searchParams;
  const defaultEmail = params.email?.trim() ?? '';

  return <SignupForm defaultEmail={defaultEmail} />;
}
