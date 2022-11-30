import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1 className='text-3xl'>Planejamento dietético</h1>
      <ul>
        <li>
          <Link
            className='text-blue-600 hover:underline'
            to='/consumo24h'
          >
            Consumo Alimentar 24h
          </Link>
        </li>
        <li>
          <Link
            className='text-blue-600 hover:underline'
            to='/consumohabitual'
          >
            Consumo Alimentar Habitual
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
