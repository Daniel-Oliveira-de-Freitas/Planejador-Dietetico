export async function removeRefeicaoDieta(id: number) {
  await window.prisma.refeicaoDieta.delete({
    where: {
      id,
    },
  });
}
