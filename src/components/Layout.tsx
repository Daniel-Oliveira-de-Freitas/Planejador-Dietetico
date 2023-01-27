import { Link, useLocation } from 'react-router-dom';
import React, { useContext } from 'react';
import { PacienteContext } from '../context/PacienteContext';

interface NavbarProps {
  children: React.ReactNode;
}
const Layout = (props: NavbarProps) => {
  const location = useLocation();
  const { setTab } = useContext(PacienteContext);
  return (
    <div className='flex flex-col'>
      <nav className={'flex h-[60px] w-full items-center bg-sky-600'}>
        {location.pathname !== '/' && (
          <Link to={'/'}>
            <button
              className={'h-full p-4 text-xl text-white hover:bg-sky-700'}
              onClick={() => setTab(0)}
            >
              🡐
            </button>
          </Link>
        )}
        <div className={'flex w-full justify-center'}>
          <h2 className={'text-xl text-white'}>😋 Planejador dietético</h2>
        </div>
      </nav>
      <main className='mx-auto w-full p-8'>{props.children}</main>
    </div>
  );
};

export default Layout;
