import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import ConsumoAlimentar24h from './routes/ConsumoAlimentar24h';
import ConsumoAlimentarHabitual from './routes/ConsumoAlimentarHabitual';
import DietaPaciente from './routes/DietaPaciente';
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
          path='/consumo24h'
          element={<ConsumoAlimentar24h />}
        />
        <Route
          path='/consumohabitual'
          element={<ConsumoAlimentarHabitual />}
        />
        <Route
          path='/dietaPaciente'
          element={<DietaPaciente />}
        />
      </Routes>
    </MemoryRouter>
  </React.StrictMode>
);
