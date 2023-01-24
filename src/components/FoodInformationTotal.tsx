import { Refeicao } from '../types/types';
import React from 'react';
import { TipoDeRefeicao } from '@prisma/client';

interface FoodInformationTotal {
  setTipoDeRefeicao: (value: React.SetStateAction<TipoDeRefeicao>) => void;
  foodArray: Refeicao[];
  tiposDeRefeicao: TipoDeRefeicao[];
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
      <div>
        <hr />
        <b>Total de Nutrientes</b>
        <table className='table-fixed'>
          <thead>
            <tr>
              <th>Nutrientes</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kcal</td>
              <td>{Math.ceil(kcal)}</td>
            </tr>
            <tr>
              <td>Proteínas</td>
              <td>{Math.ceil(prot)}</td>
            </tr>
            <tr>
              <td>Carboidratos</td>
              <td>{Math.ceil(carb)}</td>
            </tr>
            <tr>
              <td>Lipídios</td>
              <td>{Math.ceil(lipid)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FoodInformationTotal;
