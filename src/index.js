import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import PaginaPrincipal from './pages/PaginaPrincipal/index';
import PaginaAnimais from './pages/PaginaAnimais/index';
import PaginaAlimentacao from './pages/PaginaAlimentacao/index';
import PaginaVacinacao from './pages/PaginaVacinacao/index';
import PaginaRaca from './pages/PaginaRaca/index';
import PaginaEspecie from './pages/PaginaEspecie/index';


const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <PaginaPrincipal/>
      },
      {
        path: "/animais",
        element: <PaginaAnimais/>
      },
      {
        path: "/alimentacao",
        element: <PaginaAlimentacao/>
      },
      {
        path: "/vacinacao",
        element: <PaginaVacinacao/>
      },
      {
        path: "/racas",
        element: <PaginaRaca/>
      },
      {
        path: "/especies",
        element: <PaginaEspecie/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
