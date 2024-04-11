import { Card } from 'flowbite-react';
import SignInForm from '../../modules/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <Card>
        <h1 className="mb-3 text-2xl font-bold">Sign-in</h1>
        <SignInForm />
      </Card>
    </div>
  );
}
