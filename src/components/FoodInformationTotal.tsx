import { Refeicao } from '../types/types';
import React from 'react';

interface FoodInformationTotal {
  foodArray: Refeicao[];
}

const FoodInformationTotal = (props: FoodInformationTotal) => {
  const kcal = props.foodArray.reduce((total, refeicao) => {
    return total + refeicao.alimentoTACO.energy[0].kcal * refeicao.quantidade;
  }, 0);

  const prot = props.foodArray.reduce((total, refeicao) => {
    return total + refeicao.alimentoTACO.protein[0].qty * refeicao.quantidade;
  }, 0);

  const lipid = props.foodArray.reduce((total, refeicao) => {
    return total + refeicao.alimentoTACO.lipid[0].qty * refeicao.quantidade;
  }, 0);

  const carb = props.foodArray.reduce((total, refeicao) => {
    return total + refeicao.alimentoTACO.carbohydrate[0].qty * refeicao.quantidade;
  }, 0);

  return (
    <>
      <table className='border-2 border-solid border-slate-500 '>
        <thead>
          <tr>
            <th className='border-2 border-slate-500'> Nutrientes Alimentares </th>
            <th className='border-2 border-slate-500'> Total </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border-2 border-slate-500'>Kcal </td>
            <td className='border-2 border-slate-500'>{kcal.toFixed(0)}</td>
          </tr>
          <tr>
            <td className='border-2 border-slate-500'>Proteínas </td>
            <td className='border-2 border-slate-500'>{prot.toFixed(0)}</td>
          </tr>
          <tr>
            <td className='border-2 border-slate-500'>Carboidratos </td>
            <td className='border-2 border-slate-500'>{carb.toFixed(0)}</td>
          </tr>
          <tr>
            <td className='border-2 border-slate-500'>Lipídios </td>
            <td className='border-2 border-slate-500'>{lipid.toFixed(0)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FoodInformationTotal;
