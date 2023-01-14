export const getAllPacientes = async () => {
    const pacientes = await window.prisma.paciente.findMany();
  
    return pacientes;
  };
  