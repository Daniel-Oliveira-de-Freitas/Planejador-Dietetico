import Modal from 'react-modal';
import Layout from '../components/Layout';
import { useState } from 'react';

Modal.setAppElement('#root');

const Pacientes = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Layout>
      <h1 className='text-3xl uppercase'>Gerenciamento de Pacientes</h1>
      <hr />
      <br />
      <div className='flow-root'>
        <div className='float-right'>
          <button
            type='button'
            className=' mr-2 mb-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300'
            onClick={handleOpenModal}
          >
            + Adicionar Paciente
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className='sm:mr-auto sm:ml-auto lg:mt-16 lg:mr-60 lg:ml-60 block rounded-lg border border-gray-300 bg-gray-50 p-6 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
      >
        <h1 className='text-center text-3xl uppercase'>
          Cadastro de Pacientes
        </h1>
        <hr />
        <br />
        <div className='grid-row-2 grid content-center items-center justify-items-center'>
          <div className='content-center'>
            <label className='mt-2 block text-sm font-medium text-gray-900 '>
              Nome
            </label>
            <input
              type='text'
              className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>
          <div className=''>
            <label className='mt-2 block text-sm font-medium text-gray-900 '>
              Idade
            </label>
            <input
              type='text'
              className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>

          <div className='content-center'>
            <label className='mt-2 block text-sm font-medium text-gray-900 '>
              Sexo
            </label>
            <input
              type='text'
              className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>
          <div className='content-center'>
            <label className='mt-2 block text-sm font-medium text-gray-900 '>
              Peso
            </label>
            <input
              type='text'
              className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='mt-2 block text-sm font-medium text-gray-900 '>
              Altura
            </label>
            <input
              type='text'
              className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>
        </div>
        <div className='mr-2  border-separate flex items-center justify-center space-x-4 rounded-b border-gray-200 p-5 dark:border-gray-600'>
          <div>
          <button
            data-modal-toggle='defaultModal'
            type='button'
            className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 '
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
          </div>
          <div>
          <button
            data-modal-toggle='defaultModal'
            type='submit'
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
            onClick={() => {

              setIsOpen(false);
            }}
          >
            Adicionar
          </button>
          </div>
        </div>
      </Modal>
      <br />
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
              Idade
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Sexo
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Peso
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Altura
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b bg-white'>
            <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'></td>
            <td className='py-4 px-6'></td>
            <td className='py-4 px-6'></td>
            <td className='py-4 px-6'></td>
            <td className='py-4 px-6'></td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default Pacientes;
