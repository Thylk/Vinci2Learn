import { Card } from 'flowbite-react';
import SignInForm from '../../modules/auth/SignInForm';

export default function SignInPage() {
  return (
    <Card>
      <h1 className="mb-3 text-2xl font-bold">Sign-in</h1>
      <SignInForm />
    </Card>
  );
}
