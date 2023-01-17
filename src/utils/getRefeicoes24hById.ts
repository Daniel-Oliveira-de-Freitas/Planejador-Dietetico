export const getRefeicoes24hById = async (id: number) => {
  const refeicoes = await window.prisma.refeicaoConsumo24h.findMany({
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

  return refeicoes;
};
