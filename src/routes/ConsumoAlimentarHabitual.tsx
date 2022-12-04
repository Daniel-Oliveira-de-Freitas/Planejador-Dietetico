import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { addConsumoHabitual } from '../utils/addConsumoHabitual';

const ConsumoAlimentarHabitual = () => {
  const [paciente, setPaciente] = useState({});
  const [consumoHabitual, setConsumoHabitual] = useState({
    acucar: false,
    acucarFreq: 0,
    adocante: false,
    adocanteFreq: 0,
    frituras: false,
    friturasFreq: 0,
    carneComGordura: false,
    carneComGorduraFreq: 0,
    frangoComPele: false,
    frangoComPeleFreq: 0,
    coposDeAgua: 0,
    latasDeOleo: 0,
    numeroDePessoas: 1,
    localDoAlmoco: '',
    localDaJanta: '',
    quemPrepara: '', // achar um nome melhor
  });

  const tabelaConsumo = [
    {
      label: 'açúcar/doces',
      inputName: 'acucar',
    },
    {
      label: 'adoçante',
      inputName: 'adocante',
    },
    {
      label: 'frituras',
      inputName: 'frituras',
    },
    {
      label: 'carne com gordura aparente',
      inputName: 'carneComGordura',
    },
    {
      label: 'frango com pele',
      inputName: 'frangoComPele',
    },
  ];

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
    toast.promise(addConsumoHabitual(1, consumoHabitual), {
      error: 'Não foi possível salvar',
      pending: 'Salvando...',
      success: 'Dados salvos com sucesso!',
    });
  };

  return (
    <Layout>
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
            {tabelaConsumo.map(item => (
              <tr
                className='hover:bg-neutral-200'
                key={item.inputName}
              >
                <td className='py-2 pl-1'>
                  <input
                    type='checkbox'
                    name={item.inputName}
                    id={item.inputName}
                    onChange={handleChange}
                    className='hover:cursor-pointer'
                  />
                </td>
                <td className='px-4'>
                  <label
                    className='hover:cursor-pointer'
                    htmlFor={item.inputName}
                  >
                    {item.label}
                  </label>
                </td>
                <td className='px-4'>
                  <input
                    type='number'
                    name={item.inputName + 'Freq'}
                    className='float-right rounded-md border p-1 text-center'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type='submit'
          className='float-right mt-2 mr-4 rounded-md bg-neutral-500 py-1 px-2 text-lg font-semibold text-white hover:bg-neutral-400'
        >
          Salvar
        </button>
      </form>
    </Layout>
  );
};

export default ConsumoAlimentarHabitual;
