export const getPaciente = async (id: number) => {
  return window.prisma.paciente.findUnique({
    where: {
      id,
    },
    include: {
      RefeicaoConsumo24h: {
        include: {
          alimentoTACO: {
            include: {
              energy: true,
              protein: true,
              carbohydrate: true,
              lipid: true,
            },
          },
          alimentoPinheiro: {
            include: {
              measures: true,
            },
          },
        },
      },
      RefeicaoDieta: true,
    },
  });
};
