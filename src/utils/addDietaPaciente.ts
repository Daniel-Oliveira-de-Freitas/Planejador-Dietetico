interface Dieta {
  alimentoTacoId: number;
  alimentoPinheiroId: number;
  tipoRefeicao: string;
  horario: string;
}

export const addDietaPaciente = async (pacienteId: number, data: Dieta) => {
  // await window.electronAPI.prisma.consumoHabitual.create({
  await window.prisma.consumoHabitual.create({
    data,
    select: {
      Paciente: {
        where: {
          id: pacienteId,
        },
      },
    },
  });
};
