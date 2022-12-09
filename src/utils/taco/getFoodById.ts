export const getFoodById = async (id: number) => {
  const food = await window.prisma.alimentoTACO.findUnique({
    where: {
      id,
    },
  });

  return food;
};
