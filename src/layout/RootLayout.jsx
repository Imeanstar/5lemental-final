import NavBar from '@/components/navBar/NavBar';
import Heading from '@/components/Heading';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function RootLayout() {
  const { pathname } = useLocation();

  const [isHiddenPadding, setIsHiddenPadding] = useState(false);

  useEffect(
    () =>
      pathname === '/' || pathname === '/signin' || pathname === 'signup'
        ? setIsHiddenPadding(true)
        : setIsHiddenPadding(false),
    [pathname]
  );

  return (
    <>
      <Heading />
      <main className={!isHiddenPadding ? 'pt-12 pb-20' : isHiddenPadding}>
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}

export default RootLayout;
