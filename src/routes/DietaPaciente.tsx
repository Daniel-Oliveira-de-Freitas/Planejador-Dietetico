import Layout from '../components/Layout';
import Modal from 'react-modal';
import { useState } from 'react';
import { PieChart, Pie} from 'recharts';
Modal.setAppElement('#root');

const DietaPaciente = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      rigth: 'auto',
    },
  };

  

  return (
    <Layout>
      <div className='float-right'>
        <button
          type='button'
          className=' bg-blue-500 text-white font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none focus:ring-4 focus:ring-blue-300'
          onClick={handleOpenModal}
        >
          + Adicionar Refeição
        </button>
      </div>
      <h1 className='text-2xl'>Dieta do paciente</h1>
      <h2>Nome do paciente: </h2>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className='mt-6 mr-12 ml-12  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-6 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
      >
        <div className='px-6 py-6 lg:px-8'>
          <h2 className='mb-4 text-xl text-center font-medium text-gray-900 dark:text-white'>
            Prescrição dietética
          </h2>
          <form
            className='space-y-4'
            action='#'
          >
            <div className='flow-root'>
              <div className='float-left '>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Refeição:
                </label>
                <select
                  name='refeicao'
                  id='refeicao'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                >
                  <option value='desjejum'>Desjejum</option>
                  <option value='cotacao'>Cotacao</option>
                  <option value='almoco'>Almoço</option>
                  <option value='lanche'>Lanche</option>
                  <option value='jantar'>Jantar</option>
                  <option value='ceia'>Ceia</option>
                </select>
              </div>
            </div>
            <div className='flow-root'>
              <div className='float-left '>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Nome do Alimento
                </label>
                <input
                  type='text'
                  name='nomeAlimento'
                  id='nomeAlimento'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Arroz'
                />
              </div>
              <div className='float-right '>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Descrição do Alimento
                </label>
                <input
                  type='descricaoAlimento'
                  name='descricaoAlimento'
                  id='descricaoAlimento'
                  placeholder='Arroz doce'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                />
              </div>
            </div>
            <div className='flow-root'>
              <div className='float-left '>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Quantidade em Gramas
                </label>
                <input
                  type=''
                  name='quantidadeGramas'
                  id='quantidadeGramas'
                  placeholder='250'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                />
              </div>

              <div className='float-right '>
                <label className=' block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Quantidade em Medidas Caseiras
                </label>
                <input
                  type=''
                  name='quantidadeCaseiras'
                  id='quantidadeCaseiras'
                  placeholder='5 colheres'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                />
              </div>
            </div>
            <hr />
            <div className='text-end' >
            <label className=' block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Calorias: 125 calorias
            </label>
            <label className=' block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Carboidratos: 28 g
            </label>
            <label className=' block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Proteínas: 2,5 g
            </label>
            <label className=' block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Gorduras: 0,2 g
            </label>
            </div>
            <div className=''>
              <div className='mr-2 p-5 space-x-4 border-separate border-gray-200 rounded-b dark:border-gray-600'>
                <button
                  data-modal-toggle='defaultModal'
                  type='button'
                  className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                >
                  Cancelar
                </button>
                <button
                  data-modal-toggle='defaultModal'
                  type='button'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

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
