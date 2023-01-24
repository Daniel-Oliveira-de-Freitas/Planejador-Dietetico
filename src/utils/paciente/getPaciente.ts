export const getPaciente = async (id: number) => {
  return window.prisma.paciente.findUnique({
    where: {
      id,
    },
  });
};
