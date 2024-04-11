import { AxiosError, AxiosResponse } from 'axios';
import useAxios from '../api/useAxios.ts';
import { ErrorResponse } from '../api/ErrorResponse.ts';
import { useToastStore } from '../toasts/useToastStore.ts';
import { PostLessonDTO } from './PostLessonDTO.ts';
import { Lesson } from './Lesson.ts';

export default function useLessonRequest() {
  const axiosInstance = useAxios();
  const { addToast } = useToastStore();

  async function getLessons() {
    try {
      const response: AxiosResponse<Lesson[]> =
        await axiosInstance.get('/lessons');
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

  async function postLesson(values: PostLessonDTO) {
    try {
      const response: AxiosResponse<Lesson> = await axiosInstance.post(
        '/lessons',
        values,
      );
      addToast({ type: 'success', message: 'Lesson successfully created' });
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

  return { getLessons, postLesson };
}
