import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DietaPaciente from './routes/DietaPaciente';
import Pacientes from './routes/Pacientes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PacienteContextProvider } from './context/PacienteContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
    <PacienteContextProvider>
      <MemoryRouter>
        <Routes>
          <Route
            path='/'
            element={<Pacientes />}
          />
          <Route
            path='/pacientes'
            element={<Pacientes />}
          />
          <Route
            path='/dietaPaciente'
            element={<DietaPaciente />}
          />
        </Routes>
      </MemoryRouter>
    </PacienteContextProvider>
  </React.StrictMode>
);
