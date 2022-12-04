import Layout from '../components/Layout';
const DietaPaciente = () => {
  return (
    <Layout>
      <h1 className='text-2xl'>Dieta do paciente</h1>
      <button
        type='button'
        className='bg-blue-500 text-white font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none focus:ring-4 focus:ring-blue-300'
      >
        +
      </button>
      <hr />
      <details className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100'>
        <summary>Desjejum</summary>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Nome
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Quantidade
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                kcal
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Carboidratos
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Proteinas
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Gorduras
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b'>
              <th
                scope='row'
                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
              ></th>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
            </tr>
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100'>
        <summary>Cotação</summary>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Nome
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Quantidade
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                kcal
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Carboidratos
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Proteinas
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Gorduras
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b'>
              <th
                scope='row'
                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
              ></th>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
            </tr>
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100'>
        <summary>Almoço</summary>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Nome
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Quantidade
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                kcal
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Carboidratos
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Proteinas
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Gorduras
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b'>
              <th
                scope='row'
                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
              ></th>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
            </tr>
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100'>
        <summary>Lanche</summary>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Nome
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Quantidade
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                kcal
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Carboidratos
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Proteinas
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Gorduras
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b'>
              <th
                scope='row'
                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
              ></th>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
            </tr>
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100'>
        <summary>Jantar</summary>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Nome
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Quantidade
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                kcal
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Carboidratos
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Proteinas
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Gorduras
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b'>
              <th
                scope='row'
                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
              ></th>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
            </tr>
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100'>
        <summary>Ceia</summary>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Nome
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Quantidade
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                kcal
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Carboidratos
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Proteinas
              </th>
              <th
                scope='col'
                className='py-3 px-6'
              >
                Gorduras
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b'>
              <th
                scope='row'
                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
              ></th>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
              <td className='py-4 px-6'></td>
            </tr>
          </tbody>
        </table>
      </details>
    </Layout>
  );
};

export default DietaPaciente;
