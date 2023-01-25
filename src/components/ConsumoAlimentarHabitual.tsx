import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPaciente } from '../utils/paciente/getPaciente';
import { addConsumoHabitual } from '../utils/addConsumoHabitual';
import { ConsumoHabitual, Paciente } from '@prisma/client';
import { useLocation } from 'react-router';
import { Button } from './Button';
import { getConsumoHabitual } from '../utils/getConsumoHabitual';

const ConsumoAlimentarHabitual = () => {
  const [paciente, setPaciente] = useState<Paciente>();
  const location = useLocation();
  const { idPaciente } = location.state;
  const [consumoHabitual, setConsumoHabitual] = useState<ConsumoHabitual>();

  useEffect(() => {
    getPaciente(idPaciente).then(setPaciente);
    getConsumoHabitual(idPaciente).then(setConsumoHabitual);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsumoHabitual(prev => {
      if (e.target.type === 'checkbox') {
        return { ...prev, [e.target.name]: e.target.checked };
      }

      if (e.target.type === 'number') {
        return { ...prev, [e.target.name]: parseInt(e.target.value) };
      }

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void toast.promise(addConsumoHabitual(paciente.id, consumoHabitual), {
      error: 'Não foi possível salvar',
      pending: 'Salvando...',
      success: 'Dados salvos com sucesso!',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full'
    >
      <table className='mt-4 w-full divide-y divide-neutral-200'>
        <thead>
          <tr>
            <th className='text-sm font-thin uppercase tracking-wider'>+</th>
            <th className='px-4 text-left text-sm font-thin uppercase tracking-wider'>
              tipo de consumo
            </th>
            <th className='px-4 text-right text-sm font-thin uppercase tracking-wider'>
              frequência semanal
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-neutral-200'>
          <tr className='hover:bg-neutral-200'>
            <td className='py-2 pl-1'>
              <input
                type='checkbox'
                name={'acucar'}
                id={'acucar'}
                onChange={handleChange}
                className='hover:cursor-pointer'
                checked={consumoHabitual?.acucar || false}
              />
            </td>
            <td className='px-4'>
              <label
                className='hover:cursor-pointer'
                htmlFor={'acucar'}
              >
                açúcar/doces
              </label>
            </td>
            <td className='px-4'>
              <input
                type='number'
                name={`acucarFreq`}
                onChange={handleChange}
                className='float-right rounded-md border p-1 text-center'
                value={consumoHabitual?.acucarFreq || 0}
              />
            </td>
          </tr>
          <tr className='hover:bg-neutral-200'>
            <td className='py-2 pl-1'>
              <input
                type='checkbox'
                name={'adocante'}
                id={'adocante'}
                onChange={handleChange}
                className='hover:cursor-pointer'
                checked={consumoHabitual?.adocante || false}
              />
            </td>
            <td className='px-4'>
              <label
                className='hover:cursor-pointer'
                htmlFor={'adocante'}
              >
                adoçante
              </label>
            </td>
            <td className='px-4'>
              <input
                type='number'
                name={`adocanteFreq`}
                onChange={handleChange}
                className='float-right rounded-md border p-1 text-center'
                value={consumoHabitual?.adocanteFreq || 0}
              />
            </td>
          </tr>
          <tr className='hover:bg-neutral-200'>
            <td className='py-2 pl-1'>
              <input
                type='checkbox'
                name={'frituras'}
                id={'frituras'}
                onChange={handleChange}
                className='hover:cursor-pointer'
                checked={consumoHabitual?.frituras || false}
              />
            </td>
            <td className='px-4'>
              <label
                className='hover:cursor-pointer'
                htmlFor={'frituras'}
              >
                frituras
              </label>
            </td>
            <td className='px-4'>
              <input
                type='number'
                name={`friturasFreq`}
                onChange={handleChange}
                className='float-right rounded-md border p-1 text-center'
                value={consumoHabitual?.friturasFreq || 0}
              />
            </td>
          </tr>
          <tr className='hover:bg-neutral-200'>
            <td className='py-2 pl-1'>
              <input
                type='checkbox'
                name={'carneComGordura'}
                id={'carneComGordura'}
                onChange={handleChange}
                className='hover:cursor-pointer'
                checked={consumoHabitual?.carneComGordura || false}
              />
            </td>
            <td className='px-4'>
              <label
                className='hover:cursor-pointer'
                htmlFor={'acucar'}
              >
                carne com gordura aparente
              </label>
            </td>
            <td className='px-4'>
              <input
                type='number'
                name={`carneComGorduraFreq`}
                onChange={handleChange}
                className='float-right rounded-md border p-1 text-center'
                value={consumoHabitual?.carneComGorduraFreq || 0}
              />
            </td>
          </tr>
          <tr className='hover:bg-neutral-200'>
            <td className='py-2 pl-1'>
              <input
                type='checkbox'
                name={'frangoComPele'}
                id={'frangoComPele'}
                onChange={handleChange}
                className='hover:cursor-pointer'
                checked={consumoHabitual?.frangoComPele || false}
              />
            </td>
            <td className='px-4'>
              <label
                className='hover:cursor-pointer'
                htmlFor={'frangoComPele'}
              >
                frango com pele
              </label>
            </td>
            <td className='px-4'>
              <input
                type='number'
                name={`frangoComPeleFreq`}
                onChange={handleChange}
                className='float-right rounded-md border p-1 text-center'
                value={consumoHabitual?.frangoComPeleFreq || 0}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/*)}*/}
      <div className='mt-4 grid max-w-lg grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold uppercase tracking-wider'>
            latas de óleo por mês
          </span>
          <input
            type='number'
            name='latasDeOleo'
            onChange={handleChange}
            className='max-w-sm rounded-md border p-1 text-center'
            value={consumoHabitual?.latasDeOleo || 0}
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold uppercase tracking-wider'>
            copos de água por dia
          </span>
          <input
            type='number'
            name='coposDeAgua'
            onChange={handleChange}
            className='max-w-sm rounded-md border p-1 text-center'
            value={consumoHabitual?.coposDeAgua || 0}
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold uppercase tracking-wider'>
            quem prepara as refeições
          </span>
          <input
            type='text'
            name='quemPrepara'
            onChange={handleChange}
            className='max-w-sm rounded-md border p-1 text-center'
            value={consumoHabitual?.quemPrepara || ''}
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold uppercase tracking-wider'>
            nº de pessoas em casa
          </span>
          <input
            type='number'
            name='numeroDePessoas'
            onChange={handleChange}
            className='max-w-sm rounded-md border p-1 text-center'
            value={consumoHabitual?.numeroDePessoas || 1}
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold uppercase tracking-wider'>local do almoço</span>
          <div>
            <input
              type='radio'
              name='localDoAlmoco'
              className='mr-1 hover:cursor-pointer'
              id='almocoCasa'
              onChange={handleChange}
              value='casa'
              checked={consumoHabitual?.localDoAlmoco === 'casa'}
            />
            <label
              htmlFor='almocoCasa'
              className='hover:cursor-pointer'
            >
              Casa
            </label>
            <input
              type='radio'
              name='localDoAlmoco'
              className='mx-1 hover:cursor-pointer'
              id='almocoRestaurante'
              onChange={handleChange}
              value='restaurante'
              checked={consumoHabitual?.localDoAlmoco === 'restaurante'}
            />
            <label
              htmlFor='almocoRestaurante'
              className='hover:cursor-pointer'
            >
              Restaurante
            </label>
            <input
              type='radio'
              name='localDoAlmoco'
              className='mx-1 hover:cursor-pointer'
              id='almocoOutro'
              onChange={handleChange}
              value='outro'
              checked={consumoHabitual?.localDoAlmoco === 'outro'}
            />
            <label
              htmlFor='almocoOutro'
              className='hover:cursor-pointer'
            >
              Outro
            </label>
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold uppercase tracking-wider'>local da janta</span>
          <div>
            <input
              type='radio'
              name='localDaJanta'
              className='mr-1 hover:cursor-pointer'
              id='jantaCasa'
              onChange={handleChange}
              value='casa'
              checked={consumoHabitual?.localDaJanta === 'casa'}
            />
            <label
              htmlFor='jantaCasa'
              className='hover:cursor-pointer'
            >
              Casa
            </label>
            <input
              type='radio'
              name='localDaJanta'
              className='mx-1 hover:cursor-pointer'
              id='jantaRestaurante'
              onChange={handleChange}
              value='restaurante'
              checked={consumoHabitual?.localDaJanta === 'restaurante'}
            />
            <label
              htmlFor='jantaRestaurante'
              className='hover:cursor-pointer'
            >
              Restaurante
            </label>
            <input
              type='radio'
              name='localDaJanta'
              className='mx-1 hover:cursor-pointer'
              id='jantaOutro'
              onChange={handleChange}
              value='outro'
              checked={consumoHabitual?.localDaJanta === 'outro'}
            />
            <label
              htmlFor='jantaOutro'
              className='hover:cursor-pointer'
            >
              Outro
            </label>
          </div>
        </div>
      </div>
      <br />
      <div className='mt-4 flex w-full justify-end'>
        <Button type='submit'>Salvar</Button>
      </div>
    </form>
  );
};

export default ConsumoAlimentarHabitual;
