import NavBar from '@/components/navBar/NavBar';
import Heading from '@/components/Heading';
import { Outlet, useLocation } from 'react-router-dom';

function RootLayout() {
  const { pathname } = useLocation();

  let isHiddenPadding = null;

  if ( pathname === '/' || pathname === '/signin' || pathname === 'signup') {
    isHiddenPadding = null;
  }

  return (
    <>
      <Heading />
      <main className={!isHiddenPadding ? 'pb-20' : isHiddenPadding}>
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}

export default RootLayout