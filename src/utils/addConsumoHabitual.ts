interface ConsumoHabitual {
  acucar: boolean;
  adocante: boolean;
  frituras: boolean;
  carneComGordura: boolean;
  coposDeAgua: number;
  latasDeOleo: number;
  numeroDePessoas: number;
  localDoAlmoco: string;
  localDaJanta: string;
  quemPrepara: string;
}

export const addConsumoHabitual = async (
  pacienteId: number,
  data: ConsumoHabitual
) => {
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
