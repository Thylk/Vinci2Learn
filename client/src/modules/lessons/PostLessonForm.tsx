import { useForm } from 'react-hook-form';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import useLessonRequest from './useLessonRequest.ts';
import useCourseRequest from '../courses/useCourseRequest.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Lesson } from './Lesson.ts';

interface FormData {
  name: string;
  course: number;
}

export default function PostLessonForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { postLesson } = useLessonRequest();
  const { getCourses } = useCourseRequest();
  const queryClient = useQueryClient();

  const { status, data } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  const mutation = useMutation({
    mutationFn: postLesson,
    onSuccess: (lesson: Lesson) => {
      queryClient.setQueryData<Lesson[]>(['lessons'], (oldData = []) => [
        ...oldData,
        lesson,
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
          <Label htmlFor="name">Course</Label>
        </div>
        <Select
          {...register('course', { required: true })}
          helperText={errors.name && <span>This field is required</span>}
        >
          {status === 'pending' ? (
            <option>Loading...</option>
          ) : status === 'error' ? (
            <option>Error loading courses</option>
          ) : (
            data.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))
          )}
        </Select>
      </div>
      <div className="flex flex-col">
        <div className="mb-2 block">
          <Label htmlFor="name">Name of the lesson</Label>
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
