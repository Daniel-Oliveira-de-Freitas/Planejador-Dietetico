export async function removeConsumo24h(id: number) {
  await window.prisma.refeicaoConsumo24h.delete({
    where: {
      id,
    },
  });
}
