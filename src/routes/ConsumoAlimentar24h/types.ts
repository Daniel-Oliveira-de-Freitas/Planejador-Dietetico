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
  alimentoTACO: AlimentoTACOComMacros;
  alimentoPinheiro: AlimentoPinheiroComMedidas;
  alimentoTACOId: number;
  alimentoPinheiroId: number;
  medida: string;
  quantidade: number;
  horario: Date;
  tipoDeRefeicaoId: number;
}
