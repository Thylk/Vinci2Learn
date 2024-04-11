import { Navigate, Outlet } from 'react-router-dom';
import { useSessionStore } from '../../modules/auth/useSessionStore.ts';

export default function PublicGuard() {
  const { session } = useSessionStore();
  return session === null ? <Outlet /> : <Navigate to={'/'} />;
}
