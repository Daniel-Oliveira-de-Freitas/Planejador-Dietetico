import { Refeicao } from '../types/types';
import React from 'react';
import { TipoDeRefeicao } from '@prisma/client';

interface FoodInformationTotal {
  setTipoDeRefeicao: (value: React.SetStateAction<TipoDeRefeicao>) => void;
  foodArray: Refeicao[];
  tiposDeRefeicao: TipoDeRefeicao[];
}

const FoodInformationTotal = (props: FoodInformationTotal) => {
  const sumKcal = () => {
    let sum: number = 0;
    props.tiposDeRefeicao.map(
      tipoDeRefeicao =>
        props.foodArray.length > 0 &&
        props.foodArray.map(alimento => {
          if (alimento.tipoDeRefeicaoId === tipoDeRefeicao.id) {
            sum += Math.ceil(alimento.alimentoTACO.energy[0].kcal) * alimento.quantidade;
          }
        })
    );
    return sum;
  };

  const sumProteinas = () => {
    let sum: number = 0;
    props.tiposDeRefeicao.map(
      tipoDeRefeicao =>
        props.foodArray.length > 0 &&
        props.foodArray.map(alimento => {
          if (alimento.tipoDeRefeicaoId === tipoDeRefeicao.id) {
            sum += Math.ceil(alimento.alimentoTACO.protein[0].qty) * alimento.quantidade;
          }
        })
    );
    return sum;
  };
  const sumCarboidratos = () => {
    let sum: number = 0;
    props.tiposDeRefeicao.map(
      tipoDeRefeicao =>
        props.foodArray.length > 0 &&
        props.foodArray.map(alimento => {
          if (alimento.tipoDeRefeicaoId === tipoDeRefeicao.id) {
            sum += Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) * alimento.quantidade;
          }
        })
    );
    return sum;
  };
  const sumLipidos = () => {
    let sum: number = 0;
    props.tiposDeRefeicao.map(
      tipoDeRefeicao =>
        props.foodArray.length > 0 &&
        props.foodArray.map(alimento => {
          if (alimento.tipoDeRefeicaoId === tipoDeRefeicao.id) {
            sum += Math.ceil(alimento.alimentoTACO.lipid[0].qty) * alimento.quantidade;
          }
        })
    );
    return sum;
  };
  return (
    <>
      <div>
        <hr />
        <b>Total de Nutrientes</b>
        <table className='table-fixed'>
          <thead>
            <th>Nutrientes</th>
            <th>Total</th>
          </thead>
          <tbody>
            <tr>
              <td>Kcal</td>
              <td>{sumKcal()}</td>
            </tr>
            <tr>
              <td>Proteínas</td>
              <td>{sumProteinas()}</td>
            </tr>
            <tr>
              <td>Carboidratos</td>
              <td>{sumCarboidratos()}</td>
            </tr>
            <tr>
              <td>Lipídios</td>
              <td>{sumLipidos()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FoodInformationTotal;
