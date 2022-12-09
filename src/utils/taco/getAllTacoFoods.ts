export const getAllTacoFoods = async () => {
  const foods = await window.prisma.alimentoTACO.findMany();

  return foods;
};
