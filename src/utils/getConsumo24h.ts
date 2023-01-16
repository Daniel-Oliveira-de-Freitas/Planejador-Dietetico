export const getConsumo24h = async (pacienteId: number) => {
  const consumo24h = await window.prisma.consumo24h.findUnique({
    where: { id: pacienteId },
    include: {
      refeicoes: true,
    },
  });

  return consumo24h;
};
