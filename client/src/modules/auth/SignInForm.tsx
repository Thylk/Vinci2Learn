import { useForm } from 'react-hook-form';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
    // try {
    //   const response: AxiosResponse<AuthResponse> = await axiosInstance.post(
    //     '/login_check',
    //     values,
    //   );
    //   setUser(response.data.user);
    //   setToken(response.data.token);
    // } catch (error) {
    //   const axiosError = error as AxiosError<ErrorResponse>;
    //   addToast({
    //     type: 'error',
    //     message: axiosError.response?.data.message ?? 'Something went wrong.',
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <form
      className="flex w-60 flex-col gap-4"
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
        {isLoading ? <Spinner size={'sm'} /> : 'Submit'}
      </Button>
    </form>
  );
}
