import { Paciente } from '@prisma/client';
import { Refeicao } from '../types/types';

export const addConsumo24h = async (consumos: Refeicao[], paciente: Paciente) => {
  const transactions: any[] = [];

  consumos.map(consumo => {
    const createRefeicao = window.prisma.refeicaoConsumo24h.create({
      data: {
        medida: consumo.medida,
        quantidade: consumo.quantidade,
        alimentoPinheiro: {
          connect: {
            id: consumo.alimentoPinheiro.id,
          },
        },
        alimentoTACO: {
          connect: {
            id: consumo.alimentoTACO.id,
          },
        },
        tipoDeRefeicao: {
          connect: {
            id: consumo.tipoDeRefeicaoId,
          },
        },
        Paciente: {
          connect: {
            id: paciente.id,
          },
        },
      },
    });
    transactions.push(createRefeicao);
  });

  const refeicoes = await window.prisma.$transaction(transactions);
};
