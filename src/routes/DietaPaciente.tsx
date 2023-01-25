import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { Paciente } from '.prisma/client';
import { getPaciente } from '../utils/paciente/getPaciente';
import { useLocation } from 'react-router-dom';
import PacientePanel from '../components/PacientePanel';
import Tabs from '../components/Tabs';

const DietaPaciente = () => {
  const location = useLocation();
  const { idPaciente } = location.state;
  const [paciente, setPaciente] = useState<Paciente>();

  useEffect(() => {
    getPaciente(idPaciente).then(setPaciente);
  }, []);

  return (
    <Layout>
      {paciente && <PacientePanel paciente={paciente} />}
      <Tabs />
    </Layout>
  );
};

export default DietaPaciente;
