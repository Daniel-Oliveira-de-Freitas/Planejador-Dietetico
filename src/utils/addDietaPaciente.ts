import { Paciente } from '@prisma/client';
import { Refeicao } from '../types/types';
interface Dieta {
  alimentoTacoId: number;
  alimentoPinheiroId: number;
  tipoRefeicao: string;
  horario: string;
}

export const addDietaPaciente = async (refeicoes: Refeicao[], paciente: Paciente) => {
  const refeicoesDTO = refeicoes.map(({ alimentoTACO, alimentoPinheiro, ...rest }) => rest);

  const refeicoesIds: any[] = [];

  for (let i = 0; i < refeicoes.length; i++) {
    const createRefeicao = await window.prisma.refeicaoDieta.create({
      data: {
        medida: refeicoes[i].medida,
        quantidade: refeicoes[i].quantidade,
        alimentoPinheiro: {
          connect: {
            id: refeicoes[i].alimentoPinheiro.id,
          },
        },
        alimentoTACO: {
          connect: {
            id: refeicoes[i].alimentoTACO.id,
          },
        },
        tipoDeRefeicao: {
          connect: {
            id: refeicoes[i].tipoDeRefeicaoId,
          },
        },
      },
    });

    refeicoesIds.push(createRefeicao.id);

    console.log('refeicoesIds', refeicoesIds);
    console.log('createRefeicao', createRefeicao);
  }

  const createConsumo = await window.prisma.dieta.create({
    data: {
      refeicoes: {
        connect: refeicoesIds.map(id => ({ id })),
      },
      Paciente: {
        connect: {
          id: paciente.id,
        },
      },
    },
  });

  console.log('createConsumo', createConsumo);
};
