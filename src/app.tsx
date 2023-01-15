import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DietaPaciente from './routes/DietaPaciente';
import Pacientes from './routes/Pacientes';
import Home from './routes/Home/Home';
import ConsumoAlimentar24h from './components/ConsumoAlimentar24h';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
    <MemoryRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/pacientes'
          element={<Pacientes />}
        />
        <Route
          path='/consumo24h'
          element={<ConsumoAlimentar24h />}
        />
        <Route
          path='/dietaPaciente'
          element={<DietaPaciente />}
        />
      </Routes>
    </MemoryRouter>
  </React.StrictMode>
);
