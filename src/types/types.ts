import {
  AlimentoTACO,
  Energy,
  Carbohydrate,
  Protein,
  Lipid,
  AlimentoPinheiro,
  MeasurePinheiro,
  RefeicaoConsumo24h,
  Prisma,
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
  tipoDeRefeicaoId: number;
  medida: string;
  quantidade: number;
}

export type Periodo = 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia';

export type Consumo = {
  periodo: Periodo;
  refeicoes: Refeicao[];
};

export interface RefeicaoConsumo24hComAlimentos extends RefeicaoConsumo24h {
  id: number;
  alimentoTACOId: number;
  alimentoPinheiroId: number;
  tipoDeRefeicaoId: number;
  medida: string;
  quantidade: number;
  pacienteId: number;
  alimentoTACO: AlimentoTACOComMacros;
  alimentoPinheiro: AlimentoPinheiroComMedidas;
}

const pctComMacros = Prisma.validator<Prisma.PacienteArgs>()({
  include: {
    RefeicaoConsumo24h: {
      include: {
        alimentoTACO: {
          include: {
            energy: true,
            protein: true,
            carbohydrate: true,
            lipid: true,
          },
        },
        alimentoPinheiro: {
          include: {
            measures: true,
          },
        },
      },
    },
    RefeicaoDieta: true,
  },
});

export type PacienteComMacros = Prisma.PacienteGetPayload<typeof pctComMacros>;
