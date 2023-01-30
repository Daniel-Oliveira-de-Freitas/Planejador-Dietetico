import { RefeicaoConsumo24hComAlimentos, RefeicaoDietaComAlimentos } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { TipoDeRefeicao } from '@prisma/client';
import { toast } from 'react-toastify';
import { convertMacros } from '../utils/convertMacros';
import { getPaciente } from '../utils/paciente/getPaciente';
import { PacienteContext } from '../context/PacienteContext';
import { getAllRefeicaoDieta } from '../utils/getAllRefeicaoDieta';

interface FoodDropdownProps {
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  setTipoDeRefeicao: (value: React.SetStateAction<TipoDeRefeicao>) => void;
  foodArray: RefeicaoDietaComAlimentos[] | RefeicaoConsumo24hComAlimentos[];
  tiposDeRefeicao: TipoDeRefeicao[];
  setConsumo?: (
    value: React.SetStateAction<RefeicaoDietaComAlimentos[] | RefeicaoConsumo24hComAlimentos[]>
  ) => void;
  removeFn?: (id: number) => Promise<void>;
}

const FoodDropdown = (props: FoodDropdownProps) => {
  const { paciente, setPaciente } = useContext(PacienteContext);
  const removeItem = (id: number, foodArray: RefeicaoConsumo24hComAlimentos[]) => {
    return props.setConsumo(foodArray.filter(food => food.id !== id));
  };
  const [dieta, setDieta] = useState<RefeicaoConsumo24hComAlimentos[]>();

  useEffect(() => {
    getAllRefeicaoDieta(paciente?.id).then(setDieta);
  }, [paciente]);

  const tiposPreenchidos = new Set(dieta?.map(food => food.tipoDeRefeicaoId));

  return (
    <>
      {props.tiposDeRefeicao.map(tipoDeRefeicao => (
        <div
          key={tipoDeRefeicao.id}
          className={'mt-4'}
        >
          <div className={'flex w-full items-center justify-between pl-4'}>
            <div className='text-lg font-semibold tracking-widest text-sky-900'>
              {tipoDeRefeicao.nome}
            </div>
            <button
              onClick={() => {
                props.setIsOpen(true);
                props.setTipoDeRefeicao(tipoDeRefeicao);
              }}
              className={
                'rounded-full bg-sky-900/20 px-4 py-2 text-lg font-semibold font-bold text-sky-900 hover:border-0 hover:bg-sky-600 hover:text-white'
              }
            >
              +
            </button>
          </div>
          <div className={'mt-4 ml-4 rounded-lg border'}>
            {tiposPreenchidos.has(tipoDeRefeicao.id) && (
              <table className='mt-2 w-full divide-y text-left text-sky-900'>
                <thead className='h-8 text-sm font-semibold uppercase tracking-wider'>
                  <tr className={''}>
                    <th className='pl-4'>nome</th>
                    <th>qtd</th>
                    <th>kcal</th>
                    <th>carb.</th>
                    <th>prot.</th>
                    <th>gord.</th>
                    {props.setConsumo && <th>ação</th>}
                  </tr>
                </thead>
                <tbody>
                  {props.foodArray.length > 0 &&
                    props.foodArray.map(alimento => {
                      if (alimento.tipoDeRefeicaoId === tipoDeRefeicao.id) {
                        return (
                          <tr
                            key={alimento.id}
                            className='even:bg-sky-50 hover:bg-sky-100'
                          >
                            <td className='whitespace-nowrap py-4 pl-4 text-sky-900'>
                              {alimento.alimentoTACO.description}
                            </td>
                            <td className='whitespace-nowrap py-4 text-sky-900'>
                              {alimento.quantidade + alimento.alimentoPinheiro.measures[0].label}
                            </td>
                            <td className='whitespace-nowrap py-4 text-sky-900'>
                              {convertMacros(
                                alimento.alimentoTACO,
                                alimento.alimentoPinheiro.measures[0].qty,
                                alimento.quantidade
                              ).kcal + 'kcal'}
                            </td>
                            <td className='whitespace-nowrap py-4 text-sky-900'>
                              {convertMacros(
                                alimento.alimentoTACO,
                                alimento.alimentoPinheiro.measures[0].qty,
                                alimento.quantidade
                              ).carb + alimento.alimentoTACO.carbohydrate[0].unit}
                            </td>
                            <td className='whitespace-nowrap py-4 text-sky-900'>
                              {convertMacros(
                                alimento.alimentoTACO,
                                alimento.alimentoPinheiro.measures[0].qty,
                                alimento.quantidade
                              ).protein + alimento.alimentoTACO.protein[0].unit}
                            </td>
                            <td className='whitespace-nowrap py-4 text-sky-900'>
                              {convertMacros(
                                alimento.alimentoTACO,
                                alimento.alimentoPinheiro.measures[0].qty,
                                alimento.quantidade
                              ).lipid + alimento.alimentoTACO.lipid[0].unit}
                            </td>
                            {props.setConsumo && props.removeFn && (
                              <td className='whitespace-nowrap py-4 text-sky-900'>
                                <button
                                  className={
                                    'rounded-full border-rose-500 p-2 text-rose-500 hover:border-0 hover:bg-rose-500 hover:text-white'
                                  }
                                  onClick={() => {
                                    void toast.promise(props.removeFn(alimento.id), {
                                      pending: 'Excluíndo...',
                                      error: 'Não foi possível excluir!',
                                      success: 'Excluído com sucesso!',
                                    });
                                    removeItem(alimento.id, props.foodArray);
                                    getPaciente(paciente.id).then(setPaciente);
                                  }}
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
                            )}
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default FoodDropdown;
