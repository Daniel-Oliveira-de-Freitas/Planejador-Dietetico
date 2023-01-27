import Layout from '../components/Layout';
import { useContext, useEffect } from 'react';
import { getPaciente } from '../utils/paciente/getPaciente';
import { useLocation } from 'react-router-dom';
import PacientePanel from '../components/PacientePanel';
import Tabs from '../components/Tabs';
import { PacienteContext } from '../context/PacienteContext';

const DietaPaciente = () => {
  const location = useLocation();
  const { idPaciente } = location.state;
  const { paciente, setPaciente } = useContext(PacienteContext);

  useEffect(() => {
    getPaciente(idPaciente).then(setPaciente);
  }, []);

  return (
    <Layout>
      {paciente && <PacientePanel />}
      <Tabs />
    </Layout>
  );
};

export default DietaPaciente;
