import { AlimentoTACOComMacros } from '../types/types';

export const convertMacros = (
  tacoFood: AlimentoTACOComMacros,
  pinheiroQty: number,
  pinheiroMeasureValue: number
) => {
  if (pinheiroQty > 0 && tacoFood) {
    const calcKcal =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.energy[0].kcal / tacoFood.base_qty);
    const calcCarb =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.carbohydrate[0].qty / tacoFood.base_qty);
    const calcProtein =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.protein[0].qty / tacoFood.base_qty);
    const calcLipid =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.lipid[0].qty / tacoFood.base_qty);
    return {
      kcal: calcKcal.toFixed(0),
      carb: calcCarb.toFixed(0),
      protein: calcProtein.toFixed(0),
      lipid: calcLipid.toFixed(0),
    };
  }
  return {
    kcal: 0,
    carb: 0,
    protein: 0,
    lipid: 0,
  };
};
