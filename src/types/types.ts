import {
  AlimentoTACO,
  Energy,
  Carbohydrate,
  Protein,
  Lipid,
  AlimentoPinheiro,
  MeasurePinheiro,
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
    RefeicaoDieta: {
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
  },
});

const refeicaoDietaComAlimentos = Prisma.validator<Prisma.RefeicaoDietaArgs>()({
  include: {
    alimentoPinheiro: {
      include: {
        measures: true,
      },
    },
    alimentoTACO: {
      include: {
        energy: true,
        carbohydrate: true,
        protein: true,
        lipid: true,
      },
    },
  },
});

const refeicaoConsumo24hComAlimentos = Prisma.validator<Prisma.RefeicaoConsumo24hArgs>()({
  include: {
    alimentoPinheiro: {
      include: {
        measures: true,
      },
    },
    alimentoTACO: {
      include: {
        energy: true,
        carbohydrate: true,
        protein: true,
        lipid: true,
      },
    },
  },
});

export type PacienteComMacros = Prisma.PacienteGetPayload<typeof pctComMacros>;
export type RefeicaoConsumo24hComAlimentos = Prisma.RefeicaoConsumo24hGetPayload<
  typeof refeicaoConsumo24hComAlimentos
>;
export type RefeicaoDietaComAlimentos = Prisma.RefeicaoDietaGetPayload<
  typeof refeicaoDietaComAlimentos
>;
