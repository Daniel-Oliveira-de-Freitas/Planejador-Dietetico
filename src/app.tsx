import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import ConsumoAlimentar24h from './routes/ConsumoAlimentar24h';
import ConsumoAlimentarHabitual from './routes/ConsumoAlimentarHabitual';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/consumo24h',
    element: <ConsumoAlimentar24h />,
  },
  {
    path: '/consumohabitual',
    element: <ConsumoAlimentarHabitual />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
