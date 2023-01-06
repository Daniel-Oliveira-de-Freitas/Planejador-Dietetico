export const getAllTacoFoods = async () => {
  const foods = await window.prisma.alimentoTACO.findMany({
    include: {
      energy: true,
      carbohydrate: true,
      protein: true,
      lipid: true,
    },
  });

  return foods;
};
