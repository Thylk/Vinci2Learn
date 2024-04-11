import { Link, Outlet } from 'react-router-dom';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useSessionStore } from '../../modules/auth/useSessionStore.ts';
import ToastContainer from '../../modules/toasts/ToastContainer.tsx';

export default function PrivateLayout() {
  const { session, setSession } = useSessionStore();
  const handleSignOut = () => {
    setSession(null);
  };

  return (
    <div id="private_layout">
      <Navbar fluid rounded>
        <Navbar.Brand>
          <img
            src="https://flowbite-react.com/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Vinci2Learn
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{session?.user.username}</span>
              <span className="block truncate text-sm font-medium">
                {session?.user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={Link} to="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} to="/courses">
            Courses
          </Navbar.Link>
          <Navbar.Link as={Link} to="/lessons">
            Lessons
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
      <ToastContainer />
    </div>
  );
}
