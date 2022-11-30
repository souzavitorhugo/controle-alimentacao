import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import PaginaPrincipal from './pages/PaginaPrincipal/index';
import PaginaAlimentacao from './pages/PaginaAlimentacao/index';
import PaginaAnimais from './pages/PaginaAnimais/index';
import PaginaVacinacao from './pages/PaginaVacinacao/index';


//Ideia é ter a barra notificando o nome do usuario logado com o logo à esquerda na tela principal
//abaixo da logo, vem o collapse de navegação 

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/'>
          <Route index element={<PaginaPrincipal modulo={"inicio"}/>}/>
        </Route>

        <Route path='/animais'>
          <Route index element={<PaginaAnimais modulo={"animais"}/>}/>
        </Route>

        <Route path='/alimentacao'>
          <Route index element={<PaginaAlimentacao modulo={"alimentacao"}/>}/>
        </Route>

        <Route path='/vacinacao'>
          <Route index element={<PaginaVacinacao modulo={"vacinacao"}/>}/>
        </Route>

      </Routes>
                  
    </BrowserRouter>
  );
}

export default App;
