import { useForm } from 'react-hook-form';
import { Button, Label, TextInput } from 'flowbite-react';
import useCourseRequest from './useCourseRequest.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Course } from './Course.ts';

interface FormData {
  name: string;
}

export default function PostCourseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { postCourse } = useCourseRequest();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postCourse,
    onSuccess: (course: Course) => {
      queryClient.setQueryData<Course[]>(['courses'], (oldData = []) => [
        ...oldData,
        course,
      ]);
    },
  });

  function onSubmit(values: FormData) {
    mutation.mutate(values);
  }

  return (
    <form
      className="flex w-72 flex-col gap-4"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <div className="flex flex-col">
        <div className="mb-2 block">
          <Label htmlFor="name">Name of the course</Label>
        </div>
        <TextInput
          type="text"
          placeholder="Name"
          autoComplete="off"
          {...register('name', { required: true })}
          helperText={errors.name && <span>This field is required</span>}
        />
      </div>
      <Button type="submit" className="mt-2 font-bold">
        Submit
      </Button>
    </form>
  );
}
