import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
//import Navigator from '../../components/Navigation/index';
import Header from '../../components/Header/index';
import FormCadastroAplicacao from '../../components/Forms/formCadastroAplicacao';
import FormCadastroVacina from '../../components/Forms/formCadastroVacina';

import { listarVacinacoes } from '../../actions/controllers/vacinacaoController';

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn  from "./append/btn-vacinacao.png";


export default function PaginaVacinacao(props) {
    const [data, setData] = useState();
    const [openVacina, setOpenVacina] = useState(false);
    const [openAplicacao, setOpenAplicacao] = useState(false);


    const style = {
        bgcolor: 'background.paper',
        boxShadow: 10,
    };

    useEffect(() => {
        listarVacinacoes(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco, por favor tente novamente");
            setData(resp.body);
        });
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

    const handleOpenCadastroVacina = () => {
        setOpenVacina(true);
    };

    const handleCloseVacina = () => {
        setOpenVacina(false);
    };

    const handleOpenCadastroAplicacao = () => {
        setOpenAplicacao(true);
    };

    const handleCloseCadastroAplicacao = () => {
        setOpenAplicacao(false);
    };

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

                        <Button variant="contained" onClick={handleOpenCadastroVacina}> Nova Vacina </Button>

                        <Button style={{marginLeft: 5}}variant="contained" onClick={handleOpenCadastroAplicacao}> Nova Aplicação </Button>

                        <span className="th-titulo-tabela">Animais Cadastrados</span>

                        <table className="container-table">
                                
                            <thead>
                    
                                <tr>
                                    <th className="table-header-border">
                                        Identificador (RFID)
                                    </th> 

                                    <th className="table-header-border">
                                        Vacina
                                    </th> 

                                    <th className="table-header-border">
                                        Quant. Aplicações
                                    </th>

                                    <th className="table-header-border">
                                        Quant. Doses
                                    </th> 

                                    <th className="table-header-border">
                                        Data Primeira Dose
                                    </th> 

                                    <th className="table-header-border">
                                        Data Última aplicação
                                    </th> 

                                </tr>
                                
                                
                            </thead>

                            <tbody>
                                {data?.map((item, index, arr) => (
                                
                                    <tr className="table-tablebody-row" key={item.id}> 
                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.rfid.codigoRFID}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.tipoVacinacao}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.quantDoseAplicada}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.quantDose}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.dataInicioAplicacao ? item.dataInicioAplicacao.split('T')[0] : "-"}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.dataUltimaDoseAplicada ? item.dataUltimaDoseAplicada.split('T')[0] : "-"}
                                        </td>

                                    </tr>
                                ))}

                                
                            </tbody>

                            
                        </table>

                        <span className="th-footer-tabela">Quantidade de animais cadastrados:{data?.length}</span>
                    </main>
                    
                </section>

            </div>

            {/* MODAL CADASTRO VACINA*/}

            <Modal
                id="modal-cadastro-vacina"
                open={openVacina}
                onClose={handleCloseVacina}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-animal-dropshadow" sx={style}>
                    <div className="modal-container" style={{...style, width: 600}}>

                        <h4 className="titulo-modal"> CADASTRO </h4>
                            
                        <FormCadastroVacina/>

                    </div>
                </Box>
                

            </Modal>
        
            {/* FIM MODAL CADASTRO VACINA*/}

            {/* MODAL CADASTRO APLICACAO VACINA*/}

            <Modal
                id="modal-cadastro-aplicacao"
                open={openAplicacao}
                onClose={handleCloseCadastroAplicacao}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-aplicacao-dropshadow" sx={style}>
                    <div className="modal-container" style={{...style, width: 600}}>

                        <h4 className="titulo-modal"> CADASTRO </h4>

                        <FormCadastroAplicacao/>

                    </div>
                </Box>
                

            </Modal>
        
            {/* FIM MODAL CADASTRO APLICACAO VACINA*/}

        </Fragment>
    )
}