import {Fragment} from 'react';
import { Link } from 'react-router-dom'

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";

import './index.css'

export default function Navigator() {
    const openNav = () => {
        let screenWidth = window.screen.width;
    
        if (screenWidth < 450) {
          document.getElementById("sidenav").style.width = "100vw";
        } else {
          document.getElementById("sidenav").style.width = "200px";
          document.getElementById("main").style.marginLeft = "150px";
        }
    }
    
    const closeNav = () => {
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }

    return (
        <Fragment>

            <nav id="sidenav" className="sidenav">

                <span className="closebtn" onClick={closeNav}>&times;</span>

                <Link to="/">
                    <span className="nav-btn"> <img src={pataBtn} className="" alt="botão do menu inicio"/> Início </span>
                </Link>
                
                <Link to="/animais">
                    <span className="nav-btn"> <img src={animaisBtn} className="" alt="botão do menu animais"/> Animais </span>
                </Link>

                <Link to="/alimentacao">
                    <span className="nav-btn"> <img src={alimentacaoBtn} className="" alt="botão do menu inicio"/> Alimentação </span>
                </Link>

                <Link to="/vacinacao">
                    <span className="nav-btn"> <img src={vacinacaoBtn} className="" alt="botão do menu inicio"/> Vacinação </span>
                </Link>

            </nav>

        </Fragment>
        
    )
}