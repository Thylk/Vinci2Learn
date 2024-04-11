import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./app/pages/ErrorPage";
import HomePage from "./app/pages/HomePage";
import PrivateGuard from "./app/guards/PrivateGuard";
import PrivateLayout from './app/layouts/PrivateLayout.tsx';
import PublicGuard from "./app/guards/PublicGuard";
import PublicLayout from './app/layouts/PublicLayout.tsx';
import SignInPage from "./app/pages/SignInPage";

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
                path: "/",
                element: <HomePage />,
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
                path: "sign-in",
                element: <SignInPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;