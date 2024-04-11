import { Card } from 'flowbite-react';
import SignUpForm from '../../modules/users/PostUserForm';

export default function SignUpPage() {
  return (
    <Card>
      <h1 className="mb-3 text-2xl font-bold">Sign-up</h1>
      <SignUpForm />
    </Card>
  );
}
