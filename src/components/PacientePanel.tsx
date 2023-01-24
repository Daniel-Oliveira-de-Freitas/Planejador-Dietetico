import { Paciente } from '@prisma/client';
import React from 'react';
import { getAge } from '../utils/getAge';

type PacientePanelProps = {
  paciente: Paciente;
};
export default function PacientePanel({ paciente }: PacientePanelProps) {
  return (
    <Container>
      <div className={'flex items-stretch justify-items-stretch gap-4'}>
        {paciente.sexo === 'Masculino' && <SexSymbol>♂</SexSymbol>}
        {paciente.sexo === 'Feminino' && <SexSymbol>♀</SexSymbol>}
        {paciente.sexo === 'NaoBinario' && <SexSymbol>NB</SexSymbol>}
        <div className={'text-4xl text-sky-800'}>
          <span className={'font-bold'}>{paciente.nome}</span>
          <span className={'font-thin'}>, {getAge(paciente.dataDeNascimento)} anos</span>
        </div>
      </div>
      <PanelGrid>
        <LeftPanel>
          <div className={'text-sky-900'}>
            <span className={'font-semibold'}>Altura: </span>
            {paciente.altura} cm
          </div>
          <div className={'text-sky-900'}>
            <span className={'font-semibold'}>Peso: </span>
            {paciente.peso} kg
          </div>
        </LeftPanel>
        <MiddlePanel>
          <div className={'text-sky-900'}>
            <span className={'font-semibold'}>IMC: </span>
            {getIMC(paciente).toFixed(1)}
          </div>
          <div className={'text-sky-900'}>
            <span className={'font-semibold'}>Classificação: </span>
            {classifyIMC(paciente)}
          </div>
        </MiddlePanel>
      </PanelGrid>
    </Container>
  );
}

function PanelGrid({ children }: { children: React.ReactNode }) {
  return <div className={'mt-6 grid grid-cols-3'}>{children}</div>;
}

function MiddlePanel({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function LeftPanel({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function getIMC(paciente: Paciente) {
  const alturaEmMetros = paciente.altura / 100;
  return paciente.peso / (alturaEmMetros ^ 2);
}

function classifyIMC(paciente: Paciente) {
  if (getIMC(paciente) < 18.5) return 'Magreza';
  if (getIMC(paciente) < 25) return 'Saudável';
  if (getIMC(paciente) < 30) return 'Sobrepeso';
  return 'Obesidade';
}

type ContainerProps = {
  children: React.ReactNode;
};

function Container(props: ContainerProps) {
  return <div className={'rounded-lg bg-sky-200 py-4 px-8'}>{props.children}</div>;
}

function SexSymbol({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 p-2 text-4xl font-bold text-white'
      }
    >
      {children}
    </div>
  );
}
