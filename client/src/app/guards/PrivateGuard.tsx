import { Navigate, Outlet } from 'react-router-dom';
import { useSessionStore } from '../../modules/auth/useSessionStore.ts';

export default function PrivateGuard() {
  const { token } = useSessionStore();
  return token !== null ? <Outlet /> : <Navigate to={'/sign-in'} />;
}