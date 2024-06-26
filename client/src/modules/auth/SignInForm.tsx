import { useForm } from 'react-hook-form';
import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthResponse } from './AuthResponse.ts';
import useAxios from '../api/useAxios.ts';
import { ErrorResponse } from '../api/ErrorResponse.ts';
import { useToastStore } from '../toasts/useToastStore.ts';
import { useSessionStore } from './useSessionStore.ts';

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const axiosInstance = useAxios();
  const { setSession } = useSessionStore();
  const { addToast } = useToastStore();

  async function onSubmit(values: FormData) {
    try {
      const response: AxiosResponse<AuthResponse> = await axiosInstance.post(
        '/auth/sign-in',
        values,
      );
      setSession(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      addToast({
        type: 'error',
        message: axiosError.response?.data.message ?? 'Something went wrong.',
      });
    }
  }

  return (
    <form
      className="flex w-72 flex-col gap-4"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <div className="flex flex-col">
        <div className="mb-2 block">
          <Label htmlFor="email">Email</Label>
        </div>
        <TextInput
          type="email"
          placeholder="Email"
          autoComplete="on"
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
          autoComplete="current-password"
          {...register('password', { required: true })}
          helperText={errors.password && <span>This field is required</span>}
        />
      </div>
      <Button type="submit" className="mt-2 font-bold">
        Submit
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{' '}
        <Link
          to="/sign-up"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
