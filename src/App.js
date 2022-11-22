import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import PaginaPrincipal from './pages/PaginaPrincipal/index';

//Ideia é ter a barra notificando o nome do usuario logado com o logo à esquerda na tela principal
//abaixo da logo, vem o collapse de navegação 

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/'>
          <Route index element={<PaginaPrincipal/>}/>
        </Route>

      </Routes>
                  
    </BrowserRouter>
  );
}

export default App;
