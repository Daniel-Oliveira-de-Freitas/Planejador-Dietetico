export const getAllPinheiroFoods = async () => {
  const foods = await window.prisma.alimentoPinheiro.findMany();

  return foods;
};
