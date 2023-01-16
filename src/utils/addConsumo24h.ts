import { Paciente } from '@prisma/client';
import { Refeicao } from '../types/types';

export const addConsumo24h = async (refeicoes: Refeicao[], paciente: Paciente) => {
  const refeicoesIds: any[] = [];

  for (let i = 0; i < refeicoes.length; i++) {
    const createRefeicao = await window.prisma.refeicaoConsumo24h.create({
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
  }

  const createConsumo = await window.prisma.consumo24h.create({
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
