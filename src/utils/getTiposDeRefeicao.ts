export const getTiposDeRefeicao = async () => {
  const tiposDeRefeicao = await window.prisma.tipoDeRefeicao.findMany();

  return tiposDeRefeicao;
};
