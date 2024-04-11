import { useForm } from 'react-hook-form';
import { Button, Label, TextInput } from 'flowbite-react';
import useUserRequest from './useUserRequest.ts';
import { Link } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function PostUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { postUser } = useUserRequest();

  async function onSubmit(values: FormData) {
    console.log(values);
    await postUser(values);
  }

  return (
    <form
      className="flex w-72 flex-col gap-4"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <div className="flex flex-col">
        <div className="mb-2 block">
          <Label htmlFor="username">Username</Label>
        </div>
        <TextInput
          type="text"
          placeholder="Username"
          autoComplete="off"
          {...register('username', { required: true })}
          helperText={errors.username && <span>This field is required</span>}
        />
      </div>
      <div className="flex flex-col">
        <div className="mb-2 block">
          <Label htmlFor="email">Email</Label>
        </div>
        <TextInput
          type="email"
          placeholder="Email"
          autoComplete="off"
          {...register('email', { required: true })}
          helperText={errors.email && <span>This field is required</span>}
        />
      </div>
      <div className="flex flex-col">
        <div className="mb-2 block">
          <Label htmlFor="password">Password</Label>
        </div>
        <TextInput
          type="password"
          placeholder="••••••••"
          autoComplete="off"
          {...register('password', { required: true })}
          helperText={errors.password && <span>This field is required</span>}
        />
      </div>
      <Button type="submit" className="mt-2 font-bold">
        Submit
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          to="/sign-in"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
