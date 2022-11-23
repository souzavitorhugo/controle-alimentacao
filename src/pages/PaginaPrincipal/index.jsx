import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'

//import Navigator from '../../components/Navigation/index';
import Header from '../../components/Header/index';

import ModuloAlimentacao from '../../modulos/Alimentacao/index';
import ModuloVacinacao from '../../modulos/Vacinacao/index';

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";

import './index.css'

export default function PaginaPrincipal(props) {
    const [modulo, setModulo] = useState();

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

    const getModulo = () => {
        let modulo;

        switch(props.modulo){
            case "inicio":
                modulo = 'inicio';
                break;
            case "alimentacao":
                modulo = <ModuloAlimentacao/>
                break;
            case "vacinacao":
                modulo = <ModuloVacinacao/>
                break;
        }
    
        return setModulo(modulo);
    }

    useEffect(() => {
        getModulo(props.modulo)
    }, [])

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
                    <span className="nav-btn"> <img src={animaisBtn} className="" alt="botão do menu animais"/> Animais </span>
                    <hr/>
                    <span className="nav-btn"> <img src={alimentacaoBtn} className="" alt="botão do menu inicio"/> Alimentação </span>
                    <hr/>
                    <span className="nav-btn"> <img src={vacinacaoBtn} className="" alt="botão do menu inicio"/> Vacinação </span>
                    <hr/>
                </nav>


                <section className="main-container">
                <aside className="flex-align-left">
                    <img src={burguerImg} className="burguer-img" alt="botão do menu" onClick={openNav}/>
                </aside>

                <main id="main" className="modulo-container">
                    {modulo}
                </main>
                </section>

            </div>
            
            

        </Fragment>
    )
}