interface Paciente {
  nome: string;
  idade: number;
  sexo: string;
  peso: number;
  altura: number;
}

export const addPaciente = async (data: Paciente) => {
  const paciente = await window.prisma.paciente.create({
    data,
  });

  return paciente;
};
