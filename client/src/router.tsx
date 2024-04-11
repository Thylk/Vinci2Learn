import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './app/pages/ErrorPage';
import HomePage from './app/pages/HomePage';
import PrivateGuard from './app/guards/PrivateGuard';
import PrivateLayout from './app/layouts/PrivateLayout.tsx';
import PublicGuard from './app/guards/PublicGuard';
import PublicLayout from './app/layouts/PublicLayout.tsx';
import SignInPage from './app/pages/SignInPage';
import SignUpPage from './app/pages/SignUpPage.tsx';
import CoursePage from './app/pages/CoursePage.tsx';
import LessonPage from './app/pages/LessonPage.tsx';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            element: <PrivateLayout />,
            children: [
              {
                path: '/',
                element: <HomePage />,
              },
              {
                path: '/courses',
                element: <CoursePage />,
              },
              {
                path: '/lessons',
                element: <LessonPage />,
              },
            ],
          },
        ],
      },
      {
        element: <PublicGuard />,
        children: [
          {
            element: <PublicLayout />,
            children: [
              {
                path: 'sign-in',
                element: <SignInPage />,
              },
              {
                path: 'sign-up',
                element: <SignUpPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
