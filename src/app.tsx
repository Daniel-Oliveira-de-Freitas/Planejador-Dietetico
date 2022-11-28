import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import AvaliacaoDietetica from './routes/AvaliacaoDietetica';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/avaliacaodietetica',
    element: <AvaliacaoDietetica />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
