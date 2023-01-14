import Modal from 'react-modal';
import Layout from '../components/Layout';
import { useState } from 'react';
import { addPaciente } from '../utils/addPaciente';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const Pacientes = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const [paciente, setPaciente] = useState({
    nome: '',
    idade: 1,
    sexo: '',
    peso: 2,
    altura: 3,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaciente(prev => {
      if (e.target.type === 'number') {
        return { ...prev, [e.target.name]: parseInt(e.target.value) };
      }

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaciente(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(addPaciente(paciente), {
      error: 'Não foi possível salvar',
      pending: 'Salvando...',
      success: 'Dados salvos com sucesso!',
    });
  };

  return (
    <Layout>
      <h1 className='text-3xl uppercase'>Gerenciamento de Pacientes</h1>
      <hr />
      <br />
      <div className='flow-root'>
        <div className='float-left'>
          <div className='relative'>
            <input
              placeholder='Digite o nome de algum paciente'
              type='text'
              className='mr-2 mb-2 block w-96 rounded-full border border-gray-300 bg-gray-50 p-4 px-5 py-2.5 pl-10 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300'
            />
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                aria-hidden='true'
                className='h-5 w-5 text-gray-500 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </div>
          </div>
        </div>
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
        className='block rounded-lg border border-gray-300 bg-gray-50 p-6 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:mr-auto sm:ml-auto lg:mt-16 lg:mr-60 lg:ml-60'
      >
        <form onSubmit={handleSubmit}>
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
                name='nome'
                onChange={handleChange}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className=''>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>
                Idade
              </label>
              <input
                type='number'
                name='idade'
                onChange={handleChange}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>

            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>
                Sexo
              </label>
              <select
                name='sexo'
                onChange={handleSelected}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              >
                <option value=''></option>
                <option value='Feminino'>Feminino</option>
                <option value='Masculino'>Masculino</option>
                <option value='NaoBinario'>Não Binario</option>
              </select>
            </div>
            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>
                Peso
              </label>
              <input
                type='number'
                name='peso'
                onChange={handleChange}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>
                Altura
              </label>
              <input
                type='number'
                name='altura'
                onChange={handleChange}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>
          <div className='mr-2  flex border-separate items-center justify-center space-x-4 rounded-b border-gray-200 p-5 dark:border-gray-600'>
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
              >
                Adicionar
              </button>
            </div>
          </div>
        </form>
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
