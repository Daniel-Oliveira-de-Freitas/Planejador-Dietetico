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

export const addConsumoHabitual = async (pacienteId: number, data: ConsumoHabitual) => {
  await window.prisma.consumoHabitual.upsert({
    where: {
      pacienteId,
    },
    update: {
      acucar: data.acucar,
      acucarFreq: data.acucarFreq,
      adocante: data.adocante,
      adocanteFreq: data.adocanteFreq,
      carneComGordura: data.carneComGordura,
      carneComGorduraFreq: data.carneComGorduraFreq,
      coposDeAgua: data.coposDeAgua,
      frangoComPele: data.frangoComPele,
      frangoComPeleFreq: data.frangoComPeleFreq,
      frituras: data.frituras,
      friturasFreq: data.friturasFreq,
      latasDeOleo: data.latasDeOleo,
      localDaJanta: data.localDaJanta,
      localDoAlmoco: data.localDoAlmoco,
      quemPrepara: data.quemPrepara,
      numeroDePessoas: data.numeroDePessoas,
    },
    create: {
      acucar: data.acucar,
      acucarFreq: data.acucarFreq,
      adocante: data.adocante,
      adocanteFreq: data.adocanteFreq,
      carneComGordura: data.carneComGordura,
      carneComGorduraFreq: data.carneComGorduraFreq,
      coposDeAgua: data.coposDeAgua,
      frangoComPele: data.frangoComPele,
      frangoComPeleFreq: data.frangoComPeleFreq,
      frituras: data.frituras,
      friturasFreq: data.friturasFreq,
      latasDeOleo: data.latasDeOleo,
      localDaJanta: data.localDaJanta,
      localDoAlmoco: data.localDoAlmoco,
      quemPrepara: data.quemPrepara,
      numeroDePessoas: data.numeroDePessoas,
      paciente: {
        connect: {
          id: pacienteId,
        },
      },
    },
  });
};
