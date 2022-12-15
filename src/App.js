import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import './App.css';

import Navigator from './components/Navigation/index';
import Header from './components/Header/index';
import burguerImg from "./append/burguer-menu.png";

import PaginaPrincipal from './pages/PaginaPrincipal/index';
import PaginaAlimentacao from './pages/PaginaAlimentacao/index';
import PaginaAnimais from './pages/PaginaAnimais/index';
import PaginaVacinacao from './pages/PaginaVacinacao/index';
import PaginaRaca from './pages/PaginaRaca/index'
import PaginaEspecie from './pages/PaginaEspecie/index'

function App() {

  const openNav = () => {
    let screenWidth = window.screen.width;

    if (screenWidth < 450) {
      document.getElementById("sidenav").style.width = "100vw";
    } else {
      document.getElementById("sidenav").style.width = "200px";
      document.getElementById("main").style.marginLeft = "150px";
    }
  }

  return (
    <div className="page-container">
      <Header />

      <Navigator />

      <section className="main-container">

        <aside className="container-btn-menu">
          <div className="container-img">
            <img src={burguerImg} className="burguer-img" alt="botão do menu" onClick={openNav} />
          </div>
        </aside>

        <main id="main" className="modulo-container">
          <Outlet/>
        </main>

      </section>
    </div>
  );

}

export default App;
