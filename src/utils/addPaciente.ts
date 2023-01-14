interface Paciente {
  nome: string;
  idade: number;
  sexo: string;
  peso: number;
  altura: number;
}

export const addPaciente = async (data: Paciente) => {
  await window.prisma.paciente.create({
    data,
  });
};
