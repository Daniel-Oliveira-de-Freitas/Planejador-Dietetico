import React, { createContext, useState } from 'react';
import { PacienteComMacros } from '../types/types';

export const PacienteContext = createContext({
  paciente: null,
  setPaciente: null,
  tab: 1,
  setTab: null,
});

export function PacienteContextProvider({ children }: { children: React.ReactNode }) {
  const [paciente, setPaciente] = useState<PacienteComMacros>();
  const [tab, setTab] = useState(0);
  return (
    <PacienteContext.Provider value={{ paciente, setPaciente, tab, setTab }}>
      {children}
    </PacienteContext.Provider>
  );
}
