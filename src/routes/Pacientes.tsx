import Modal from 'react-modal';
import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { addPaciente } from '../utils/paciente/addPaciente';
import { toast } from 'react-toastify';
import { getAllPacientes } from '../utils/paciente/getAllPacientes';
import { Paciente } from '@prisma/client';
import { deletePaciente } from '../utils/paciente/deletePaciente';
import { editPaciente } from '../utils/paciente/editPaciente';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { getAge } from '../utils/getAge';

Modal.setAppElement('#root');

const Pacientes = () => {
  const MAX_RESULTS = 15;
  const [editarPaciente, setEditarPaciente] = useState<Paciente>();
  const [query, setQuery] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditIsOpen, setIsEditOpen] = useState(false);
  const [paciente, setPaciente] = useState({
    nome: '',
    idade: 0,
    sexo: 'Feminino',
    peso: 0,
    altura: 0,
  });

  useEffect(() => {
    getAllPacientes().then(setPacientes);
  }, []);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleOpenEditModal(paciente: Paciente) {
    setIsEditOpen(true);
    setEditarPaciente(paciente);
  }

  function handleCloseEditModal() {
    setIsEditOpen(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaciente(prev => {
      if (e.target.type === 'number') {
        return { ...prev, [e.target.name]: parseFloat(e.target.value) };
      }

      if (e.target.type === 'date') {
        return { ...prev, [e.target.name]: e.target.valueAsDate };
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
    void toast.promise(
      addPaciente(paciente).then(pct => {
        setPacientes(prev => {
          return [...prev, pct];
        });
      }),
      {
        error: 'Não foi possível salvar',
        pending: 'Salvando...',
        success: 'Dados salvos com sucesso!',
      }
    );
    handleCloseModal();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditarPaciente(prev => {
      if (e.target.type === 'number') {
        if (e.target.name == 'idade') {
          return { ...prev, [e.target.name]: parseInt(e.target.value) };
        }
        return { ...prev, [e.target.name]: parseFloat(e.target.value) };
      }

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleEditSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditarPaciente(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void toast.promise(editPaciente(editarPaciente.id, editarPaciente), {
      error: 'Não foi possível salvar',
      pending: 'Salvando...',
      success: 'Dados salvos com sucesso!',
    });
    handleCloseEditModal();
    setPacientes(prev => {
      const arr = prev.filter(pct => pct.id !== editarPaciente.id);
      return [...arr, editarPaciente];
    });
  };

  const deletarPaciente = (pacienteId: number) => {
    Swal.fire({
      title: 'Você está seguro?',
      text: 'Essa ação é irreversível!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        const arraySemPacienteDeletado = pacientes.filter(arr => arr.id !== pacienteId);

        void Swal.fire('Deletado!', 'Operação realizada com sucesso.', 'success');
        void deletePaciente(pacienteId);
        setPacientes(arraySemPacienteDeletado);
      }
    });
  };

  const searchPacientes =
    query === ''
      ? pacientes
      : pacientes
          .filter(pct => {
            return pct.nome.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, MAX_RESULTS);

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
              className='mr-2 mb-2 block w-96 rounded-lg border border-gray-300 bg-gray-50 p-4 px-5 py-2.5 pl-10 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300'
              onChange={event => setQuery(event.target.value)}
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
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className='float-right'>
          <Button
            type='button'
            onClick={handleOpenModal}
          >
            + Adicionar paciente
          </Button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className='mx-auto block w-[450px] rounded-lg border border-gray-300 bg-gray-50 p-6 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 lg:mt-16'
      >
        <form onSubmit={handleSubmit}>
          <h1 className='text-center text-3xl uppercase'>Cadastro de Pacientes</h1>
          <hr />
          <br />
          <div className='grid-row-2 grid content-center items-center justify-items-center'>
            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Nome</label>
              <input
                type='text'
                name='nome'
                onChange={handleChange}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Sexo</label>
              <select
                name='sexo'
                onChange={handleSelected}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              >
                <option value='Feminino'>Feminino</option>
                <option value='Masculino'>Masculino</option>
                <option value='NaoBinario'>Não-binário</option>
              </select>
            </div>
            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Peso</label>
              <input
                type='number'
                name='peso'
                step='0.01'
                onChange={handleChange}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>
                Data de nascimento
              </label>
              <input
                type='date'
                name='dataDeNascimento'
                onChange={handleChange}
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Altura (m)</label>
              <input
                type='number'
                name='altura'
                step='0.01'
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
                className='rounded-lg bg-sky-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
              >
                Adicionar
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={modalEditIsOpen}
        onRequestClose={handleCloseEditModal}
        className='block rounded-lg border border-gray-300 bg-gray-50 p-6 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:mr-auto sm:ml-auto lg:mt-16 lg:mr-60 lg:ml-60'
      >
        <form onSubmit={handleEditSubmit}>
          <h1 className='text-center text-3xl uppercase'>😊 Editar paciente</h1>
          <hr />
          <br />
          <div className='grid-row-2 grid content-center items-center justify-items-center'>
            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Nome</label>
              <input
                type='text'
                name='nome'
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                value={editarPaciente ? editarPaciente.nome : ''}
                onChange={handleEditChange}
              />
            </div>
            <div className=''>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Idade</label>
              <input
                type='number'
                name='idade'
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                value={editarPaciente ? editarPaciente.idade : ''}
                onChange={handleEditChange}
              />
            </div>

            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Sexo</label>
              <select
                name='sexo'
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                value={editarPaciente ? editarPaciente.sexo : ''}
                onChange={handleEditSelected}
              >
                <option value=''></option>
                <option value='Feminino'>Feminino</option>
                <option value='Masculino'>Masculino</option>
                <option value='NaoBinario'>Não Binario</option>
              </select>
            </div>
            <div className='content-center'>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Peso</label>
              <input
                type='number'
                name='peso'
                step='0.01'
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                value={editarPaciente ? editarPaciente.peso : ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label className='mt-2 block text-sm font-medium text-gray-900 '>Altura (m)</label>
              <input
                type='number'
                name='alturaEdit'
                step='0.01'
                className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                value={editarPaciente ? editarPaciente.altura : ''}
                onChange={handleEditChange}
              />
            </div>
          </div>
          <div className='mr-2  flex border-separate items-center justify-center space-x-4 rounded-b border-gray-200 p-5 dark:border-gray-600'>
            <div>
              <button
                data-modal-toggle='defaultModal'
                type='button'
                className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                onClick={handleCloseEditModal}
              >
                Cancelar
              </button>
            </div>
            <div>
              <button
                data-modal-toggle='defaultModal'
                type='submit'
                className='rounded-lg bg-sky-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
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
              Altura (m)
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {searchPacientes?.length > 0 &&
            searchPacientes?.map(paciente => (
              <tr
                key={paciente.id}
                className='border-b bg-white'
              >
                <td className='py-4 px-6'>{paciente.nome}</td>
                <td className='py-4 px-6'>{getAge(paciente.dataDeNascimento)}</td>
                <td className='py-4 px-6'>{paciente.sexo}</td>
                <td className='py-4 px-6'>{paciente.peso}</td>
                <td className='py-4 px-6'>{paciente.altura}</td>
                <td className='px-6t-medium py-4'>
                  <Link
                    to='/dietaPaciente'
                    state={{ idPaciente: paciente.id }}
                    title='Visualizar plano dietético'
                    type='button'
                    className='rounded-full border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-sky-600 hover:text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-eye'
                      viewBox='0 0 16 16'
                    >
                      <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z' />
                      <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />
                    </svg>
                  </Link>
                  <a
                    type='button'
                    title='Editar paciente'
                    className='ml-1 rounded-full border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:cursor-pointer hover:bg-sky-600 hover:text-white'
                    onClick={() => handleOpenEditModal(paciente)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-pencil-square'
                      viewBox='0 0 16 16'
                    >
                      <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                      <path
                        fillRule='evenodd'
                        d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                      />
                    </svg>
                  </a>
                  <a
                    onClick={() => deletarPaciente(paciente.id)}
                    type='button'
                    title='Deletar paciente'
                    className='ml-1 rounded-full border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:cursor-pointer hover:bg-red-600 hover:text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-trash'
                      viewBox='0 0 16 16'
                    >
                      <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                      <path
                        fillRule='evenodd'
                        d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Pacientes;
