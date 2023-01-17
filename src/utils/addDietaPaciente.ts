import { Paciente } from '@prisma/client';
import { Refeicao } from '../types/types';

export const addDietaPaciente = async (dietas: Refeicao[], paciente: Paciente) => {
  const transactions: any[] = [];

  dietas.map(dieta => {
    const createRefeicao = window.prisma.refeicaoDieta.create({
      data: {
        medida: dieta.medida,
        quantidade: dieta.quantidade,
        alimentoPinheiro: {
          connect: {
            id: dieta.alimentoPinheiro.id,
          },
        },
        alimentoTACO: {
          connect: {
            id: dieta.alimentoTACO.id,
          },
        },
        tipoDeRefeicao: {
          connect: {
            id: dieta.tipoDeRefeicaoId,
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
