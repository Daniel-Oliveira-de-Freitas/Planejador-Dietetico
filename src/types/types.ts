import {
  AlimentoTACO,
  Energy,
  Carbohydrate,
  Protein,
  Lipid,
  AlimentoPinheiro,
  MeasurePinheiro,
} from '@prisma/client';

export interface AlimentoTACOComMacros extends AlimentoTACO {
  energy: Energy[];
  carbohydrate: Carbohydrate[];
  protein: Protein[];
  lipid: Lipid[];
}

export interface AlimentoPinheiroComMedidas extends AlimentoPinheiro {
  measures: MeasurePinheiro[];
}

export interface Refeicao {
  id?: number;
  alimentoTACO: AlimentoTACOComMacros;
  alimentoPinheiro: AlimentoPinheiroComMedidas;
  alimentoTACOId: number;
  alimentoPinheiroId: number;
  tipoDeRefeicaoId: number;
  medida: string;
  quantidade: number;
}

export type Periodo = 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia';

export type Consumo = {
  periodo: Periodo;
  refeicoes: Refeicao[];
};
