import { Outlet } from 'react-router-dom';
import ToastContainer from '../../modules/toasts/ToastContainer';

export default function PublicLayout() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-200">
      <Outlet />
      <ToastContainer />
    </main>
  );
}
