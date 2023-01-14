export const deletePaciente = async (id: number) => {
  await window.prisma.paciente.delete({
    where: {
      id,
    },
  });
};
