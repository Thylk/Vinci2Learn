import { useSessionStore } from '../auth/useSessionStore.ts';
import { useEffect } from 'react';
import axios, { AxiosError, AxiosRequestHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

export default function useAxios() {
  const { session, setSession } = useSessionStore();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (request) => {
        request.headers = {
          ...(session?.token
            ? { Authorization: `Bearer ${session?.token}` }
            : {}),
          'Content-Type': 'application/json',
        } as AxiosRequestHeaders;
        return request;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.status === 401 && error.message === 'Expired JWT Token') {
          setSession(null);
        } else {
          await Promise.reject(error);
        }
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  });
  return axiosInstance;
}
