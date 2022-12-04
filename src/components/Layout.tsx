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
      href: '#',
    },
    {
      label: 'Consumo habitual',
      href: '/consumohabitual',
    },
    {
      label: 'Consumo 24h',
      href: '/consumo24h',
    },
    {
      label: 'Dieta Paciente',
      href: '/dietaPaciente',
    },
  ];

  return (
    <div className='flex h-screen'>
      <aside className='w-48 border-r-2 bg-neutral-100'>
        <h2 className='text-lg font-bold pl-2 my-2'>{APP_NAME}</h2>
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
      <main className='p-4 w-full'>{props.children}</main>
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
      <li className='py-1 hover:bg-neutral-200 pl-2'>{props.children}</li>
    </Link>
  );
};

export default Layout;
