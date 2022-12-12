interface ConsumoHabitual {
  acucar: boolean;
  acucarFreq: number;
  adocante: boolean;
  adocanteFreq: number;
  frituras: boolean;
  friturasFreq: number;
  carneComGordura: boolean;
  carneComGorduraFreq: number;
  frangoComPele: boolean;
  frangoComPeleFreq: number;
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
