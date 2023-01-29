export const getRefeicoes24hById = async (id: number) => {
  return window.prisma.refeicaoConsumo24h.findMany({
    where: {
      pacienteId: id,
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
