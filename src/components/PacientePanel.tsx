import { Paciente } from '@prisma/client';
import React, { useContext } from 'react';
import { getAge } from '../utils/getAge';
import { RefeicaoConsumo24hComAlimentos, RefeicaoDietaComAlimentos } from '../types/types';
import { PacienteContext } from '../context/PacienteContext';

export default function PacientePanel() {
  const { paciente, tab } = useContext(PacienteContext);

  return (
    <Container>
      <div>
        <div className={'flex items-stretch justify-items-stretch gap-4'}>
          {paciente.sexo === 'Masculino' && <SexSymbol>♂</SexSymbol>}
          {paciente.sexo === 'Feminino' && <SexSymbol>♀</SexSymbol>}
          <div className={'text-4xl text-sky-800'}>
            <span className={'font-bold'}>{paciente.nome}</span>
            <span className={'font-thin'}>, {getAge(paciente.dataDeNascimento)} anos</span>
          </div>
        </div>
        <PanelGrid>
          <LeftPanel>
            <div className={'text-sky-900'}>
              <span className={'font-semibold'}>Altura: </span>
              {paciente.altura}m
            </div>
            <div className={'text-sky-900'}>
              <span className={'font-semibold'}>Peso: </span>
              {paciente.peso}kg
            </div>
          </LeftPanel>
          <RightPanel>
            <div className={'text-sky-900'}>
              <span className={'font-semibold'}>IMC: </span>
              {getIMC(paciente).toFixed(1)} kg/m²
            </div>
            <div className={'text-sky-900'}>
              <span className={'font-semibold'}>Classificação: </span>
              {classifyIMC(paciente)}
            </div>
          </RightPanel>
        </PanelGrid>
      </div>
      {paciente?.RefeicaoConsumo24h && tab === 2 && (
        <div>
          <div className={'mb-2 text-2xl text-sky-800'}>Macronutrientes</div>
          <div className={'grid grid-cols-2 gap-x-4 text-sm text-sky-800'}>
            <div className={'font-semibold'}>Kcal:</div>
            <div>{sumMacros(paciente.RefeicaoConsumo24h).kcal.toFixed(0)}</div>
            <div className={'font-semibold'}>Carboidratos:</div>
            <div>{sumMacros(paciente.RefeicaoConsumo24h).carb.toFixed(0)}</div>
            <div className={'font-semibold'}>Proteínas:</div>
            <div>{sumMacros(paciente.RefeicaoConsumo24h).prot.toFixed(0)}</div>
            <div className={'font-semibold'}>Gorduras:</div>
            <div>{sumMacros(paciente.RefeicaoConsumo24h).lipid.toFixed(0)}</div>
          </div>
        </div>
      )}
      {paciente?.RefeicaoDieta && tab === 0 && (
        <div>
          <div className={'mb-2 text-2xl text-sky-800'}>Macronutrientes</div>
          <div className={'grid grid-cols-2 gap-x-4 text-sm text-sky-800'}>
            <div className={'font-semibold'}>Kcal:</div>
            <div>{sumMacrosDieta(paciente.RefeicaoDieta).kcal.toFixed(1)}</div>
            <div className={'font-semibold'}>Carboidratos:</div>
            <div>{sumMacrosDieta(paciente.RefeicaoDieta).carb.toFixed(1)}</div>
            <div className={'font-semibold'}>Proteínas:</div>
            <div>{sumMacrosDieta(paciente.RefeicaoDieta).prot.toFixed(1)}</div>
            <div className={'font-semibold'}>Gorduras:</div>
            <div>{sumMacrosDieta(paciente.RefeicaoDieta).lipid.toFixed(1)}</div>
          </div>
        </div>
      )}
    </Container>
  );
}

function PanelGrid({ children }: { children: React.ReactNode }) {
  return <div className={'mt-6 grid max-w-lg grid-cols-2'}>{children}</div>;
}

function RightPanel({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function LeftPanel({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function getIMC(paciente: Paciente) {
  return paciente.peso / (paciente.altura ^ 2);
}

function classifyIMC(paciente: Paciente) {
  if (getIMC(paciente) < 18.5) return 'magreza';
  if (getIMC(paciente) < 25) return 'saudável';
  if (getIMC(paciente) < 30) return 'sobrepeso';
  return 'obesidade';
}

type ContainerProps = {
  children: React.ReactNode;
};

function Container(props: ContainerProps) {
  return (
    <div className={'mx-auto flex max-w-5xl justify-between rounded-lg bg-sky-200 py-4 px-8'}>
      {props.children}
    </div>
  );
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

function sumMacros(foodArray: RefeicaoConsumo24hComAlimentos[] | RefeicaoDietaComAlimentos[]) {
  const kcal = foodArray.reduce((total, refeicao) => {
    return total + refeicao.quantidade * refeicao.alimentoTACO.energy[0].kcal;
  }, 0);
  const carb = foodArray.reduce((total, refeicao) => {
    return total + refeicao.quantidade * refeicao.alimentoTACO.carbohydrate[0].qty;
  }, 0);
  const prot = foodArray.reduce((total, refeicao) => {
    return total + refeicao.quantidade * refeicao.alimentoTACO.protein[0].qty;
  }, 0);
  const lipid = foodArray.reduce((total, refeicao) => {
    return total + refeicao.quantidade * refeicao.alimentoTACO.lipid[0].qty;
  }, 0);

  return { kcal, carb, prot, lipid };
}

function sumMacrosDieta(foodArray: RefeicaoConsumo24hComAlimentos[] | RefeicaoDietaComAlimentos[]) {
  const kcal = foodArray.reduce((total, refeicao) => {
    return (
      total +
      (refeicao.quantidade / refeicao.alimentoTACO.base_qty) * refeicao.alimentoTACO.energy[0].kcal
    );
  }, 0);
  const carb = foodArray.reduce((total, refeicao) => {
    return (
      total +
      (refeicao.quantidade / refeicao.alimentoTACO.base_qty) *
        refeicao.alimentoTACO.carbohydrate[0].qty
    );
  }, 0);
  const prot = foodArray.reduce((total, refeicao) => {
    return (
      total +
      (refeicao.quantidade / refeicao.alimentoTACO.base_qty) * refeicao.alimentoTACO.protein[0].qty
    );
  }, 0);
  const lipid = foodArray.reduce((total, refeicao) => {
    return (
      total +
      (refeicao.quantidade / refeicao.alimentoTACO.base_qty) * refeicao.alimentoTACO.lipid[0].qty
    );
  }, 0);

  return { kcal, carb, prot, lipid };
}
