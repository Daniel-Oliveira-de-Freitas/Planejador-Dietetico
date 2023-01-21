import { Refeicao } from '../types/types';
import React from 'react';
import { TipoDeRefeicao } from '@prisma/client';
import { Button } from './Button';

interface FoodDropdownProps {
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  setTipoDeRefeicao: (value: React.SetStateAction<TipoDeRefeicao>) => void;
  foodArray: Refeicao[];
  tiposDeRefeicao: TipoDeRefeicao[];
}

const FoodDropdown = (props: FoodDropdownProps) => {
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
