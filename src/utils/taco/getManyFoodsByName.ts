export const getManyFoodsByName = async (name: string) => {
  const foods = await window.prisma.alimentoTACO.findMany({
    where: {
      description: {
        contains: name,
      },
    },
  });

  return foods;
};
