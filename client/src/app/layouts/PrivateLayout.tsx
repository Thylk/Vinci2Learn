import { Outlet } from 'react-router-dom';

export default function PrivateLayout() {
  return (
    <div id="private_layout">
      <Outlet />
    </div>
  );
}
