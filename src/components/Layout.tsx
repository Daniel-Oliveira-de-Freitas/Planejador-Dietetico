import { Link } from 'react-router-dom';

interface NavbarProps {
  children: React.ReactNode;
}
const Layout = (props: NavbarProps) => {
  const APP_NAME = 'Planejador';
  const NAV_ITEMS = [
    {
      label: 'Início',
      href: '/',
    },
    {
      label: 'Pacientes',
      href: '/pacientes',
    },
    {
      label: 'Consumo 24h',
      href: '/consumo24h',
    }
  ];

  return (
    <div className='sticky flex h-screen'>
      <aside className='w-48 border-r-2 bg-neutral-100'>
        <h2 className='my-2 pl-2 text-lg font-bold'>{APP_NAME}</h2>
        <ul>
          {NAV_ITEMS.map(item => (
            <NavItem
              key={item.href}
              href={item.href}
            >
              {item.label}
            </NavItem>
          ))}
        </ul>
      </aside>
      <main className='w-full p-4'>{props.children}</main>
    </div>
  );
};

interface NavItemProps {
  children: string;
  href: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <Link to={props.href}>
      <li className='py-1 pl-2 hover:bg-neutral-200'>{props.children}</li>
    </Link>
  );
};

export default Layout;
