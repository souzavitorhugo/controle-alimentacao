import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'

//import Navigator from '../../components/Navigation/index';
import Header from '../../components/Header/index';

import { importaDadosAlimentacao } from './controllers/alimentacaoController';

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";

import './index.css'

export default function PaginaAlimentacao(props) {
    const [data, setData] = useState({});

    useEffect(() => {
        const dadosAlimentacao = importaDadosAlimentacao();
        setData(dadosAlimentacao);
        debugger;
    }, [])

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

                    {/* <Link to="/vacinacao">
                        <span className="nav-btn"> <img src={vacinacaoBtn} className="" alt="botão do menu inicio"/> Vacinação </span>
                    </Link> */}

                    {/* <hr/> */}
                </nav>


                <section className="main-container">

                    <aside className="container-btn-menu">
                        <div className="container-img">
                            <img src={burguerImg} className="burguer-img" alt="botão do menu" onClick={openNav}/>
                        </div>
                    </aside>

                    <main id="main" className="modulo-container">

                        <table className="container-table">
                            <thead>

                                <tr>
                                    <th>
                                        Teste Head
                                    </th> 

                                    <th>
                                        Teste Head 2
                                    </th> 

                                    <th>
                                        Teste Head 3
                                    </th> 
                                </tr>
                                
                                
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        linha 1 da coluna 1

                                    </td>

                                    <td>
                                        linha 1 da coluna 2

                                    </td>

                                    <td>
                                        linha 1 da coluna 3

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </main>
                    
                </section>

            </div>
            
            

        </Fragment>
    )
}