import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'

//import Navigator from '../../components/Navigation/index';
import Header from '../../components/Header/index';

import MainButton from '../../components/Buttons/MainButton/index'

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";

import './index.css'

export default function PaginaPrincipal(props) {
    const modulos = ['animais', 'alimentacao'];

    const openNav = (a, b, c, d, e) => {
        let screenWidth = window.screen.width;

        if(screenWidth < 450) {
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

            <div className="page-container">

                <Header/>

                <nav id="sidenav" className="sidenav">

                    <span className="closebtn" onClick={closeNav}>&times;</span>

                    <Link to="/">
                        <span className="nav-btn"> <img src={pataBtn} className="" alt="botão do menu inicio"/> Início </span>
                    </Link>

                    <hr/>

                    <Link to="/animais">
                        <span className="nav-btn"> <img src={animaisBtn} className="" alt="botão do menu animais"/> Animais </span>
                    </Link>

                    <hr/>

                    <Link to="/alimentacao">
                        <span className="nav-btn"> <img src={alimentacaoBtn} className="" alt="botão do menu inicio"/> Alimentação </span>
                    </Link>

                    <hr/>

                    <Link to="/vacinacao">
                        <span className="nav-btn"> <img src={vacinacaoBtn} className="" alt="botão do menu inicio"/> Vacinação </span>
                    </Link> 

                    <hr/>
                </nav>


                <section className="main-container">

                    <aside className="container-btn-menu">
                        <div className="container-img">
                            <img src={burguerImg} className="burguer-img" alt="botão do menu" onClick={openNav}/>
                        </div>
                    </aside>

                    <main id="main" className="modulo-container">

                        <div className="btn-container">
                            <Link to="/animais">
                                <button className="btn-menu"> <img src={animaisBtn} alt="botão menu da tela"/> <span> Animais </span>  </button>
                            </Link>

                            <Link to="/alimentacao">
                                <button className="btn-menu"> <img src={alimentacaoBtn} alt="botão menu da tela"/> <span> Alimentação </span>  </button>
                            </Link>

                            <Link to="/vacinacao">
                                <button className="btn-menu"> <img src={vacinacaoBtn} alt="botão menu da tela"/> <span> Vacinação </span>  </button>
                            </Link>
                        </div>
                        
                    </main>
                    
                </section>

            </div>
            
            

        </Fragment>
    )
}