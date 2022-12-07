export const getAllFoods = async () => {
  const foods = await window.prisma.alimentoTACO.findMany();

  return foods;
};
