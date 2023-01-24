import { Refeicao } from '../types/types';
import React from 'react';
import { TipoDeRefeicao } from '@prisma/client';
import { Button } from './Button';

interface FoodDropdownProps {
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  setTipoDeRefeicao: (value: React.SetStateAction<TipoDeRefeicao>) => void;
  foodArray: Refeicao[];
  tiposDeRefeicao: TipoDeRefeicao[];
  setConsumo?: (value: React.SetStateAction<Refeicao[]>) => void;
}

const FoodDropdown = (props: FoodDropdownProps) => {
  const removeItem = (id: number, foodArray: Refeicao[]) => {
    return props.setConsumo(foodArray.filter(food => food.id !== id));
  };
  return (
    <>
      {props.tiposDeRefeicao.map(tipoDeRefeicao => (
        <details key={tipoDeRefeicao.id}>
          <summary className='group mt-2 flex items-center justify-between rounded-xl border border-gray-200 py-2 px-4 text-left font-medium text-gray-500 hover:cursor-pointer hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 group-first:mt-4'>
            <div className='group-hover:text-white'>{tipoDeRefeicao.nome}</div>
            <Button
              onClick={() => {
                props.setIsOpen(true);
                props.setTipoDeRefeicao(tipoDeRefeicao);
              }}
            >
              +
            </Button>
          </summary>
          <table className='w-full rounded-b-lg text-left text-sm text-gray-500'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th className='text-left text-sm font-thin uppercase tracking-wider'>nome</th>
                <th className='text-left text-sm font-thin uppercase tracking-wider'>qtd</th>
                <th className='text-sm font-thin uppercase tracking-wider'>kcal</th>
                <th className='text-sm font-thin uppercase tracking-wider'>carb.</th>
                <th className='text-sm font-thin uppercase tracking-wider'>prot.</th>
                <th className='text-sm font-thin uppercase tracking-wider'>gord.</th>
                {props.setConsumo && (
                  <th className='text-sm font-thin uppercase tracking-wider'>excluir</th>
                )}
              </tr>
            </thead>
            <tbody>
              {props.foodArray.length > 0 &&
                props.foodArray.map(alimento => {
                  if (alimento.tipoDeRefeicaoId === tipoDeRefeicao.id) {
                    return (
                      <tr
                        key={
                          alimento.alimentoPinheiro.id +
                          tipoDeRefeicao.id +
                          alimento.alimentoTACO.id
                        }
                        className='border-b bg-white'
                      >
                        <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                          {alimento.alimentoTACO.description}
                        </td>
                        <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                          {alimento.quantidade} {alimento.alimentoPinheiro.measures[0].label}
                        </td>
                        <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                          {Math.ceil(alimento.alimentoTACO.energy[0].kcal) * alimento.quantidade}
                        </td>
                        <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                          {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) *
                            alimento.quantidade +
                            alimento.alimentoTACO.carbohydrate[0].unit}
                        </td>
                        <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                          {Math.ceil(alimento.alimentoTACO.protein[0].qty) * alimento.quantidade +
                            alimento.alimentoTACO.protein[0].unit}{' '}
                        </td>
                        <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                          {Math.ceil(alimento.alimentoTACO.lipid[0].qty) * alimento.quantidade +
                            alimento.alimentoTACO.lipid[0].unit}{' '}
                        </td>
                        {props.setConsumo && (
                          <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                            <button
                              className={
                                'rounded-full border-rose-600 p-2 text-rose-600 hover:border-0 hover:bg-rose-600 hover:text-white'
                              }
                              onClick={() => removeItem(alimento.id, props.foodArray)}
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
        </details>
      ))}
    </>
  );
};

export default FoodDropdown;
