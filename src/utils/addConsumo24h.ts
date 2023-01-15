import { RefeicaoConsumo24h } from '@prisma/client';

export const addConsumo24h = async (refeicoes: RefeicaoConsumo24h[], pacienteId: number) => {
  await window.prisma.consumo24h.create({
    data: {
      refeicoes: {
        create: refeicoes,
      },
    },
    select: {
      Paciente: {
        where: {
          id: pacienteId,
        },
      },
    },
  });
};
