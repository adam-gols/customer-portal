import { redirect } from 'next/navigation';
import { SignupForm } from '@/components/auth/SignupForm';
import { getCurrentUser } from '@/lib/auth/current-user';

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/');
  }

  return <SignupForm />;
}
