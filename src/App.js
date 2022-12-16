import { Outlet } from 'react-router-dom';

import './App.css';

import Navigator from './components/Navigation/index';
import Header from './components/Header/index';
import burguerImg from "./append/burguer-menu.png";

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
