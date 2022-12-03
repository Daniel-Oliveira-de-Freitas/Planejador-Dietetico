import { Link } from 'react-router-dom';

const ConsumoAlimentar24h = () => {
  return (
    <>
      <h2 className='text-2xl'>Consumo Alimentar em 24h</h2>
      <Link
        to='/'
        className='text-blue-600 hover:underline'
      >
        Voltar para o início
      </Link>
      <div>
        <details>
          <summary>Desjejum</summary>
          <table>
            <thead>
              <tr>
                <th>nome</th>
                <th>quantidade</th>
                <th>kcal</th>
                <th>carboidratos</th>
                <th>proteínas</th>
                <th>gorduras</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>arroz, cozido, integral</td>
                <td>3 colheres de arroz</td>
                <td>250</td>
                <td>85g</td>
                <td>9,7g</td>
                <td>5,4g</td>
              </tr>
            </tbody>
          </table>
        </details>
      </div>
    </>
  );
};

export default ConsumoAlimentar24h;
