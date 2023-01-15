export const getConsumo24h = async (pacienteId: number) => {
  const consumo24h = await window.prisma.consumo24h.findUnique({ where: { id: pacienteId } });

  return consumo24h;
};
