// import Modal from 'react-modal';
import Modal from '../components/Modal';
import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { addPaciente } from '../utils/paciente/addPaciente';
import { toast } from 'react-toastify';
import { getAllPacientes } from '../utils/paciente/getAllPacientes';
import { Paciente } from '@prisma/client';
import { deletePaciente } from '../utils/paciente/deletePaciente';
import { editPaciente } from '../utils/paciente/editPaciente';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { getAge } from '../utils/getAge';

const Pacientes = () => {
  const navigate = useNavigate();
  const MAX_RESULTS = 15;
  const [editarPaciente, setEditarPaciente] = useState<Paciente>();
  const [query, setQuery] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [paciente, setPaciente] = useState({
    nome: '',
    idade: 0,
    sexo: 'Feminino',
    peso: 0,
    altura: 0,
  });

  function handleNavigate(id: number) {
    return navigate('/dietaPaciente', {
      state: { idPaciente: id },
    });
  }

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
    }).then(result => {
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
      <div className='mx-auto w-full max-w-5xl p-2 sm:px-0'>
        <div className={'flex items-center gap-2'}>
          <div className='relative w-full'>
            <input
              placeholder='Pesquisar paciente por nome'
              type='text'
              className='h-12 w-full rounded-lg border border-gray-300 py-2 px-4 text-lg'
              onChange={event => setQuery(event.target.value)}
            />
            <svg
              aria-hidden='true'
              className='pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform text-gray-500'
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
          <Button
            type='button'
            onClick={handleOpenModal}
            className={'h-12 whitespace-nowrap'}
          >
            Cadastrar paciente
          </Button>
        </div>

        <Modal
          isOpen={isOpen}
          title={'😊 Cadastro de paciente'}
          setIsOpen={setIsOpen}
        >
          <form onSubmit={handleSubmit}>
            <div className='grid items-center justify-items-center gap-4 text-sky-800'>
              <div className='mt-4 w-full'>
                <label className='mt-2 font-thin'>Nome</label>
                <input
                  type='text'
                  name='nome'
                  onChange={handleChange}
                  className='w-full rounded-md border px-1 py-2'
                />
              </div>
              <div className='w-full'>
                <label className='font-thin'>Sexo</label>
                <select
                  name='sexo'
                  onChange={handleSelected}
                  className='w-full rounded-md border px-1 py-2'
                >
                  <option
                    value='Feminino'
                    className={'text-sky-900'}
                  >
                    Feminino
                  </option>
                  <option
                    value='Masculino'
                    className={'text-sky-900'}
                  >
                    Masculino
                  </option>
                </select>
              </div>
              <div className='w-full'>
                <label className='font-thin'>Peso</label>
                <input
                  type='number'
                  name='peso'
                  step='0.01'
                  onChange={handleChange}
                  className='w-full rounded-md border px-1 py-2'
                />
              </div>
              <div className='w-full'>
                <label className='font-thin'>Data de nascimento</label>
                <input
                  type='date'
                  name='dataDeNascimento'
                  onChange={handleChange}
                  className='w-full rounded-md border px-1 py-2'
                />
              </div>
              <div className={'w-full'}>
                <label className='font-thin'>Altura (m)</label>
                <input
                  type='number'
                  name='altura'
                  step='0.01'
                  onChange={handleChange}
                  className='w-full rounded-md border px-1 py-2'
                />
              </div>
            </div>
            <div className='mt-4 flex justify-center gap-2'>
              <Button
                type='button'
                className={'border bg-white text-sky-900 hover:bg-gray-100'}
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button type='submit'>Adicionar</Button>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={isEditOpen}
          title={'😊 Editar paciente'}
          setIsOpen={setIsEditOpen}
        >
          <form onSubmit={handleEditSubmit}>
            <div className='grid items-center justify-items-center gap-4 text-sky-800'>
              <div className='mt-4 w-full'>
                <label className='mt-2 font-thin'>Nome</label>
                <input
                  type='text'
                  name='nome'
                  className='w-full rounded-md border px-1 py-2'
                  value={editarPaciente ? editarPaciente.nome : ''}
                  onChange={handleEditChange}
                />
              </div>
              {editarPaciente?.dataDeNascimento && (
                <div className='w-full'>
                  <label className='mt-2 font-thin'>Data de nascimento</label>
                  <input
                    type='date'
                    name='dataDeNascimento'
                    className='w-full rounded-md border px-1 py-2'
                    defaultValue={
                      new Date(editarPaciente?.dataDeNascimento).toISOString().split('T')[0]
                    }
                    onChange={handleEditChange}
                    onKeyDown={e => e.preventDefault()}
                  />
                </div>
              )}
              <div className='w-full'>
                <label className='mt-2 font-thin'>Sexo</label>
                <select
                  name='sexo'
                  className='w-full rounded-md border px-1 py-2'
                  value={editarPaciente ? editarPaciente.sexo : ''}
                  onChange={handleEditSelected}
                >
                  <option value='Feminino'>Feminino</option>
                  <option value='Masculino'>Masculino</option>
                </select>
              </div>
              <div className='w-full'>
                <label className='mt-2 font-thin'>Peso</label>
                <input
                  type='number'
                  name='peso'
                  step='0.01'
                  className='w-full rounded-md border px-1 py-2'
                  value={editarPaciente ? editarPaciente.peso : ''}
                  onChange={handleEditChange}
                />
              </div>
              <div className={'w-full'}>
                <label className='mt-2 font-thin'>Altura (m)</label>
                <input
                  type='number'
                  name='altura'
                  className='w-full rounded-md border px-1 py-2'
                  value={editarPaciente ? editarPaciente.altura : ''}
                  onChange={handleEditChange}
                />
              </div>
            </div>
            <div className='mt-4 flex justify-center gap-2'>
              <Button
                type='button'
                className={'border bg-white text-sky-900 hover:bg-gray-100'}
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button type='submit'>Adicionar</Button>
            </div>
          </form>
        </Modal>
        <div className={'mt-12 rounded-lg border'}>
          <table className='mt-2 w-full divide-y text-left text-sky-900'>
            <thead className='h-8 text-sm font-semibold uppercase tracking-wider'>
              <tr>
                <th
                  scope='col'
                  className='pl-4'
                >
                  Nome
                </th>
                <th scope='col'>Idade</th>
                <th scope='col'>Sexo</th>
                <th scope='col'>Peso</th>
                <th scope='col'>Altura (m)</th>
                <th scope='col'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {searchPacientes?.length > 0 &&
                searchPacientes?.map(paciente => (
                  <tr
                    key={paciente.id}
                    className='odd:bg-sky-50 hover:bg-sky-100'
                  >
                    <td
                      className='whitespace-nowrap py-4 pl-4 text-sky-900 hover:cursor-pointer'
                      onClick={() => handleNavigate(paciente.id)}
                    >
                      {paciente.nome}
                    </td>
                    <td
                      className='whitespace-nowrap py-4 text-sky-900 hover:cursor-pointer'
                      onClick={() => handleNavigate(paciente.id)}
                    >
                      {getAge(paciente.dataDeNascimento)}
                    </td>
                    <td
                      className='whitespace-nowrap py-4 text-sky-900 hover:cursor-pointer'
                      onClick={() => handleNavigate(paciente.id)}
                    >
                      {paciente.sexo}
                    </td>
                    <td
                      className='whitespace-nowrap py-4 text-sky-900 hover:cursor-pointer'
                      onClick={() => handleNavigate(paciente.id)}
                    >
                      {paciente.peso}
                    </td>
                    <td
                      className='whitespace-nowrap py-4 text-sky-900 hover:cursor-pointer'
                      onClick={() => handleNavigate(paciente.id)}
                    >
                      {paciente.altura}
                    </td>
                    <td className='flex gap-1 whitespace-nowrap py-4 text-sky-900'>
                      <button
                        type='button'
                        title='Editar paciente'
                        className='rounded-full border-sky-900 p-2 text-sky-900 hover:border-0 hover:bg-sky-900 hover:text-white'
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
                      </button>
                      <button
                        onClick={() => deletarPaciente(paciente.id)}
                        title='Deletar paciente'
                        className='rounded-full border-rose-500 p-2 text-rose-500 hover:border-0 hover:bg-rose-500 hover:text-white'
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
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Pacientes;
