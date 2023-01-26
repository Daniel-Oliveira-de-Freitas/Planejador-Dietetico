export async function getAllConsumo24h(pacienteId: number) {
  return window.prisma.refeicaoConsumo24h.findMany({
    where: {
      pacienteId,
    },
    include: {
      alimentoTACO: {
        include: {
          carbohydrate: true,
          protein: true,
          lipid: true,
          energy: true,
        },
      },
      alimentoPinheiro: {
        include: {
          measures: true,
        },
      },
    },
  });
}
