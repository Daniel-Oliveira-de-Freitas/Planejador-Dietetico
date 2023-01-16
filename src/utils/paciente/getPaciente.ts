export const getPaciente = async (id: number) => {
  const paciente = await window.prisma.paciente.findUnique({
    where: {
      id,
    },
    include: {
      Consumo24h: {
        include: {
          refeicoes: true,
        },
      },
      consumoHabitual: true,
      Dieta: true,
    },
  });

  return paciente;
};
