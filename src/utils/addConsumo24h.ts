import { Paciente } from '@prisma/client';
import { Consumo } from '../types/types';

export const addConsumo24h = async (consumos: Consumo[], paciente: Paciente) => {
  const refeicoesIds: any[] = [];

  consumos.map(consumo => {
    consumo.refeicoes.forEach(async refeicao => {
      const createRefeicao = await window.prisma.refeicaoConsumo24h.create({
        data: {
          medida: refeicao.medida,
          quantidade: refeicao.quantidade,
          alimentoPinheiro: {
            connect: {
              id: refeicao.alimentoPinheiro.id,
            },
          },
          alimentoTACO: {
            connect: {
              id: refeicao.alimentoTACO.id,
            },
          },
          tipoDeRefeicao: {
            connect: {
              id: refeicao.tipoDeRefeicaoId,
            },
          },
        },
      });
      refeicoesIds.push(createRefeicao.id);
    });
  });

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
