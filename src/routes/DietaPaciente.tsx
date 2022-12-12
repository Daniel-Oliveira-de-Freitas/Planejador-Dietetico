import Layout from '../components/Layout';
import Modal from 'react-modal';
import { useState } from 'react';
import { PieChart, Pie } from 'recharts';
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
          className=' mr-2 mb-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300'
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
        className='mt-6 mr-12 ml-12  block rounded-lg border border-gray-300 bg-gray-50 p-6 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
      >
        <div className='px-6 py-6 lg:px-8'>
          <h2 className='mb-4 text-center text-xl font-medium text-gray-900'>
            Prescrição dietética
          </h2>
          <form
            className='space-y-4'
            action='#'
          >
            <div className='flow-root'>
              <div className='float-left '>
                <label className='mb-2 block text-sm font-medium text-gray-900'>
                  Refeição:
                </label>
                <select
                  name='refeicao'
                  id='refeicao'
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                <label className='mb-2 block text-sm font-medium text-gray-900'>
                  Nome do Alimento
                </label>
                <input
                  type='text'
                  name='nomeAlimento'
                  id='nomeAlimento'
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Arroz'
                />
              </div>
              <div className='float-right '>
                <label className='mb-2 block text-sm font-medium text-gray-900 '>
                  Descrição do Alimento
                </label>
                <input
                  type='descricaoAlimento'
                  name='descricaoAlimento'
                  id='descricaoAlimento'
                  placeholder='Arroz doce'
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>
            </div>
            <div className='flow-root'>
              <div className='float-left '>
                <label className='mb-2 block text-sm font-medium text-gray-900 '>
                  Quantidade em Gramas
                </label>
                <input
                  type=''
                  name='quantidadeGramas'
                  id='quantidadeGramas'
                  placeholder='250'
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>

              <div className='float-right '>
                <label className=' mb-2 block text-sm font-medium text-gray-900 '>
                  Quantidade em Medidas Caseiras
                </label>
                <input
                  type=''
                  name='quantidadeCaseiras'
                  id='quantidadeCaseiras'
                  placeholder='5 colheres'
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>
            </div>
            <hr />
            <div className='text-end'>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Calorias: 125 calorias
              </label>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Carboidratos: 28 g
              </label>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Proteínas: 2,5 g
              </label>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Gorduras: 0,2 g
              </label>
            </div>
            <div className=''>
              <div className='mr-2 border-separate space-x-4 rounded-b border-gray-200 p-5 dark:border-gray-600'>
                <button
                  data-modal-toggle='defaultModal'
                  type='button'
                  className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                >
                  Cancelar
                </button>
                <button
                  data-modal-toggle='defaultModal'
                  type='button'
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Desjejum</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
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
            <tr className='border-b bg-white'>
              <th
                scope='row'
                className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'
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
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Cotação</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
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
            <tr className='border-b bg-white'>
              <th
                scope='row'
                className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'
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
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Almoço</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
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
            <tr className='border-b bg-white'>
              <th
                scope='row'
                className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'
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
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Lanche</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
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
            <tr className='border-b bg-white'>
              <th
                scope='row'
                className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'
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
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Jantar</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
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
            <tr className='border-b bg-white'>
              <th
                scope='row'
                className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'
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
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Ceia</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
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
            <tr className='border-b bg-white'>
              <th
                scope='row'
                className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'
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
