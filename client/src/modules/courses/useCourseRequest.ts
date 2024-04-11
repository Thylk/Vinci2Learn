import { AxiosError, AxiosResponse } from 'axios';
import useAxios from '../api/useAxios.ts';
import { ErrorResponse } from '../api/ErrorResponse.ts';
import { useToastStore } from '../toasts/useToastStore.ts';
import { PostCourseDTO } from './PostCourseDTO.ts';
import { Course } from './Course.ts';

export default function useUserRequest() {
  const axiosInstance = useAxios();
  const { addToast } = useToastStore();

  async function getCourses() {
    try {
      const response: AxiosResponse<Course[]> =
        await axiosInstance.get('/courses');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      addToast({
        type: 'error',
        message: axiosError.message,
      });
      return Promise.reject(error);
    }
  }

  async function postCourse(values: PostCourseDTO) {
    try {
      const response: AxiosResponse<Course> = await axiosInstance.post(
        '/courses',
        values,
      );
      addToast({ type: 'success', message: 'Course successfully created' });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      addToast({
        type: 'error',
        message: axiosError.message,
      });
      return Promise.reject(error as Error);
    }
  }

  return { getCourses, postCourse };
}
