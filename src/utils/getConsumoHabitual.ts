export const getConsumoHabitual = async (pacienteId: number) => {
  return window.prisma.consumoHabitual.findUnique({
    where: {
      pacienteId,
    },
  });
};
