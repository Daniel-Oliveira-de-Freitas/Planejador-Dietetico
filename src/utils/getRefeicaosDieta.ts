export const getRefeicaoDietasById = async (id: number) => {
    const refeicoes = await window.prisma.refeicaoDieta.findMany({
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