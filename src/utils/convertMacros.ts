import { AlimentoTACOComMacros } from '../types/types';

export const convertMacros = (
  tacoFood: AlimentoTACOComMacros,
  pinheiroQty: number,
  pinheiroMeasureValue: number,
  mode?: 'dieta' | 'consumo24h'
) => {
  if (mode === 'dieta' && pinheiroQty > 0 && tacoFood) {
    const calcKcal = pinheiroQty * (tacoFood.energy[0].kcal / tacoFood.base_qty);
    const calcCarb = pinheiroQty * (tacoFood.carbohydrate[0].qty / tacoFood.base_qty);
    const calcProtein = pinheiroQty * (tacoFood.protein[0].qty / tacoFood.base_qty);
    const calcLipid = pinheiroQty * (tacoFood.lipid[0].qty / tacoFood.base_qty);
    const calcMeasure = pinheiroQty / pinheiroMeasureValue;
    return {
      kcal: calcKcal.toFixed(1),
      carb: calcCarb.toFixed(1),
      protein: calcProtein.toFixed(1),
      lipid: calcLipid.toFixed(1),
      measure: calcMeasure.toFixed(2),
    };
  }
  if (pinheiroQty > 0 && tacoFood) {
    const calcKcal =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.energy[0].kcal / tacoFood.base_qty);
    const calcCarb =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.carbohydrate[0].qty / tacoFood.base_qty);
    const calcProtein =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.protein[0].qty / tacoFood.base_qty);
    const calcLipid =
      pinheiroMeasureValue * pinheiroQty * (tacoFood.lipid[0].qty / tacoFood.base_qty);
    const calcMeasure = pinheiroQty / pinheiroMeasureValue;
    return {
      kcal: calcKcal.toFixed(0),
      carb: calcCarb.toFixed(0),
      protein: calcProtein.toFixed(0),
      lipid: calcLipid.toFixed(0),
      measure: calcMeasure.toFixed(2),
    };
  }
  return {
    kcal: 0,
    carb: 0,
    protein: 0,
    lipid: 0,
    measure: 0,
  };
};
