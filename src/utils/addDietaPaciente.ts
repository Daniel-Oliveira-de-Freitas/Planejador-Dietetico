import { Paciente } from '@prisma/client';
import { Refeicao } from '../types/types';

export const addDietaPaciente = async (consumo: Refeicao, paciente: Paciente) => {
  return window.prisma.refeicaoDieta.create({
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
};
