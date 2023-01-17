export const getPaciente = async (id: number) => {
  const paciente = await window.prisma.paciente.findUnique({
    where: {
      id,
    },
    include: {
      consumoHabitual: true,
    },
  });

  return paciente;
};
