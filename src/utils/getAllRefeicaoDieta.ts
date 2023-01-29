export async function getAllRefeicaoDieta(pacienteId: number) {
  return window.prisma.refeicaoDieta.findMany({
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
