import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  children: React.ReactNode;
}
const Layout = (props: NavbarProps) => {
  const APP_NAME = '😋Planejador';
  const NAV_ITEMS = [
    {
      label: '🏠 Início',
      href: '/',
    },
    {
      label: '👩 Pacientes',
      href: '/pacientes',
    },
  ];

  return (
    <div className='flex'>
      <aside className='fixed h-screen w-64 border-r-2 bg-sky-600'>
        <h2 className='mt-8 mb-8 pl-2 text-2xl font-bold text-white'>{APP_NAME}</h2>
        <ul>
          {NAV_ITEMS.map((item, index) => (
            <div key={item.href}>
              {index === 0 && <hr className='opacity-20' />}
              <NavItem href={item.href}>{item.label}</NavItem>
              <hr className='opacity-20' />
            </div>
          ))}
        </ul>
      </aside>
      <main className='ml-64 w-full p-8'>{props.children}</main>
    </div>
  );
};

interface NavItemProps {
  children: string;
  href: string;
}

const NavItem = (props: NavItemProps) => {
  const location = useLocation();

  return (
    <>
      <Link to={props.href}>
        <button
          className={`w-full py-4 pl-2 text-left text-lg font-semibold uppercase text-white transition-all hover:bg-sky-700 ${
            location.pathname === props.href && 'bg-sky-700'
          }`}
        >
          {props.children}
        </button>
      </Link>
    </>
  );
};

export default Layout;
