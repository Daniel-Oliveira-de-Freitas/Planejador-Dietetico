interface ConsumoHabitual {
  acucar: boolean;
  acucarFreq: number;
  acucarFreqMensal: number;
  adocante: boolean;
  adocanteFreq: number;
  adocanteFreqMensal: number;
  frituras: boolean;
  friturasFreq: number;
  friturasFreqMensal: number;
  carneComGordura: boolean;
  carneComGorduraFreq: number;
  carneComGorduraFreqMensal: number;
  frangoComPele: boolean;
  frangoComPeleFreq: number;
  frangoComPeleFreqMensal: number;
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
      acucarFreqMensal: data.acucarFreqMensal,
      adocante: data.adocante,
      adocanteFreq: data.adocanteFreq,
      adocanteFreqMensal: data.adocanteFreqMensal,
      carneComGordura: data.carneComGordura,
      carneComGorduraFreq: data.carneComGorduraFreq,
      carneComGorduraFreqMensal: data.carneComGorduraFreqMensal,
      coposDeAgua: data.coposDeAgua,
      frangoComPele: data.frangoComPele,
      frangoComPeleFreq: data.frangoComPeleFreq,
      frangoComPeleFreqMensal: data.frangoComPeleFreqMensal,
      frituras: data.frituras,
      friturasFreq: data.friturasFreq,
      friturasFreqMensal: data.friturasFreqMensal,
      latasDeOleo: data.latasDeOleo,
      localDaJanta: data.localDaJanta,
      localDoAlmoco: data.localDoAlmoco,
      quemPrepara: data.quemPrepara,
      numeroDePessoas: data.numeroDePessoas,
    },
    create: {
      acucar: data.acucar,
      acucarFreq: data.acucarFreq,
      acucarFreqMensal: data.acucarFreqMensal,
      adocante: data.adocante,
      adocanteFreq: data.adocanteFreq,
      adocanteFreqMensal: data.adocanteFreqMensal,
      carneComGordura: data.carneComGordura,
      carneComGorduraFreq: data.carneComGorduraFreq,
      carneComGorduraFreqMensal: data.carneComGorduraFreqMensal,
      coposDeAgua: data.coposDeAgua,
      frangoComPele: data.frangoComPele,
      frangoComPeleFreq: data.frangoComPeleFreq,
      frangoComPeleFreqMensal: data.frangoComPeleFreqMensal,
      frituras: data.frituras,
      friturasFreq: data.friturasFreq,
      friturasFreqMensal: data.friturasFreqMensal,
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
