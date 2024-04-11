import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';

export default function ErrorPage() {
  const [status, setStatus] = useState(500);
  const [message, setMessage] = useState('Something went wrong.');
  const [details, setDetails] = useState('An error happened.');
  const error = useRouteError();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setStatus(error.status);
      setMessage(error.statusText);
      if (error.status === 404) {
        setDetails("Sorry, the page you are looking for doesn't exist.");
      }
      if (error.status === 401) {
        setDetails('Sorry, you are not authorized to access this page.');
      }
    }
  }, [error]);

  return (
    <main className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="flex flex-col max-w-screen-sm items-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            {status}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {message}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {details}
          </p>
          <Link to={'/'}>
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}