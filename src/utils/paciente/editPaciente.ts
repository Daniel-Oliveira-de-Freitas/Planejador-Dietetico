interface Paciente {
  nome: string;
  idade: number;
  sexo: string;
  peso: number;
  altura: number;
}

export const editPaciente = async (id: number, data: Paciente) => {
  await window.prisma.paciente.update({
    data,
    where: {
      id,
    },
  });
};
