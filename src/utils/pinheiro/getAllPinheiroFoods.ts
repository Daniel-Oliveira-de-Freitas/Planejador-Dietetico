export const getAllPinheiroFoods = async () => {
  const foods = await window.prisma.alimentoPinheiro.findMany({
    include: {
      measures: true,
    },
  });

  return foods;
};
