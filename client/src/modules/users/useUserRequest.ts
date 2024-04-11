import { PostUserDTO } from './PostUserDTO.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from './User.ts';
import useAxios from '../api/useAxios.ts';
import { ErrorResponse } from '../api/ErrorResponse.ts';
import { useToastStore } from '../toasts/useToastStore.ts';
import { useSessionStore } from '../auth/useSessionStore.ts';

export default function useUserRequest() {
  const axiosInstance = useAxios();
  const { addToast } = useToastStore();
  const { session } = useSessionStore();

  async function getUsers() {
    try {
      const response: AxiosResponse<User[]> = await axiosInstance.get('/users');
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

  async function postUser(values: PostUserDTO) {
    try {
      const response: AxiosResponse<User> = await axiosInstance.post(
        '/users',
        values,
      );
      addToast({ type: 'success', message: 'Account successfully created' });
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

  async function completeLesson() {
    try {
      const response: AxiosResponse<User> = await axiosInstance.patch(
        `/users/${session?.user.id}/complete`,
      );
      addToast({ type: 'success', message: 'XP gained!' });
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

  return { getUsers, postUser, completeLesson };
}
