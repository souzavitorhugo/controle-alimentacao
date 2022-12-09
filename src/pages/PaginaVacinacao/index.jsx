import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Header from '../../components/Header/index';
import FormCadastroAplicacao from '../../components/Forms/formCadastroAplicacao';
import FormCadastroVacina from '../../components/Forms/formCadastroVacina';

import { listarVacinacoes, aplicarVacina } from '../../actions/controllers/vacinacaoController';

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn  from "./append/btn-vacinacao.png";

import {useFormik} from 'formik';
import * as Yup from 'yup';

import { listarRFID } from '../../actions/controllers/rfidController';
import { cadastrarVacinas } from '../../actions/controllers/vacinacaoController';

import Input from '../../components/Inputs/inputs';

export default function PaginaVacinacao(props) {
    const [data, setData] = useState();
    const [openVacina, setOpenVacina] = useState(false);
    const [openAplicacao, setOpenAplicacao] = useState(false);
    const [vacinas, setVacinas] = useState();
    const [listaRfids, setListaRfids] = useState();

    const hasFormErrorVacinacao = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
          return formik.errors[field];
        }
      
        return null;
    };

    const hasFormErrorAplicacao = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
          return formik.errors[field];
        }
      
        return null;
    };

    const validationSchemaAplicacao = Yup.object({
        id: Yup.number().required("Campo obrigatório"),
        dataUltimaDoseAplicada: Yup.string().required("Campo obrigatório"),
        quantDoseAplicada: Yup.number().required("Campo obrigatório"),
    });

    const validationSchemaVacinacao = Yup.object({
        rfid: Yup.number().required("Campo obrigatório"),
        dataAplicacao: Yup.string().required("Campo obrigatório"),
        quantDose: Yup.number().required("Campo obrigatório"),
        tipoVacinacao: Yup.string().required("Campo obrigatório")
    });

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 10,
    };

    useEffect(() => {
        atualizaHookVacinacoes();

        atualizaHookRFIDs();        
    }, [])

    const formikVacinacao = useFormik({
        initialValues: {
            rfid: "",
            dataAplicacao: "",
            quantDose: "",
            tipoVacinacao: "",
            emAplicacao: false,
        },
        validationSchemaVacinacao,
        onSubmit: async values => {
            if(!values.rfid || !values.quantDose || !values.dataAplicacao || !values.tipoVacinacao ) {
                window.alert('Você precisa preencher todos os dados do cadastro');
                return
            }

            const dtoCadastroVacinas = {
                "codigoRfId": parseInt(values.rfid),
                "dataInicioAplicacao": values.dataAplicacao,
                "quantDose": parseInt(values.quantDose),
                "tipoVacinacao": values.tipoVacinacao,
                "emAplicacao": false
            };

            try{
                const data = await cadastrarVacinas(dtoCadastroVacinas);
                if(!!data?.success){
                    handleCloseVacina();
                    atualizaHookVacinacoes();
                    formikVacinacao.values.dataAplicacao = "";
                    formikVacinacao.values.emAplicacao = null;
                    formikVacinacao.values.quantDose = 0;
                    formikVacinacao.values.rfid = "";
                    formikVacinacao.values.tipoVacinacao = "";
                }
            } catch (err) {
                alert(err.message);
            }
        },
    });

    const formikAplicacao = useFormik({
        initialValues: {
            id: "",
            dataUltimaDoseAplicada: "",
            quantDoseAplicada: ""
        },
        validationSchemaAplicacao,
        onSubmit: async values => {
            
            if(!values.dataUltimaDoseAplicada || !values.id || !values.quantDoseAplicada) {
                window.alert('Você precisa preencher todos os dados do cadastro');
                return
            }

            const dtoCadastro = {
                "id": parseInt(values.id),
                "dataUltimaDoseAplicada": values.dataUltimaDoseAplicada,
                "quantDoseAplicada": parseInt(values.quantDoseAplicada),
            };

          try{

            const data = await aplicarVacina(dtoCadastro);
            
            if(!!data?.success){
                handleCloseCadastroAplicacao();
                atualizaHookVacinacoes();
                window.alert('Vacina aplicada com sucesso');
                formikAplicacao.values.id = ""
                formikAplicacao.values.dataUltimaDoseAplicada = ""
                formikAplicacao.values.quantDoseAplicada = ""
            } else {
                window.alert(data.reasonPhrase);
            }

          } catch (err) {
            window.alert(err.reasonPhrase);
          }
        },
    });


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

    const atualizaHookVacinacoes = () => {
        listarVacinacoes(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco, por favor tente novamente");
            setData(resp.body);
            setVacinas(resp.body);

        });
    }

    const atualizaHookRFIDs = () => {
        listarRFID(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das raças, por favor tente novamente");
            
            let listaRetornoAPI = resp.body;
            let listaCadastrados = listaRetornoAPI.filter(item => item.emUso === true && item.ativo === true);
            setListaRfids(listaCadastrados);
        });
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
                            
                        {/* <FormCadastroVacina/> */}

                        <div className="container-form">

                            <form onSubmit={formikVacinacao.handleSubmit}> 

                                <div className="form-container-inputs">
                                    <Input
                                        id="rfid"
                                        options={listaRfids?.map(rfid => ({value: rfid.id, label: rfid.codigoRFID}))}
                                        placeholder="Escolha o RFID"
                                        type="select"
                                        label="RFID"
                                        value={formikVacinacao.values.rfid}
                                        onChange={formikVacinacao.handleChange}
                                        error={hasFormErrorVacinacao(formikVacinacao, "rfid")}
                                    />

                                    <div>
                                        <label className="form-label" htmlFor="dataNascimento">
                                            Data Primeira Aplicação
                                        </label>

                                        <input 
                                        className="form-control"
                                        id="dataAplicacao"
                                        type="date"
                                        value={formikVacinacao.values.dataAplicacao}
                                        onChange={formikVacinacao.handleChange}
                                        ></input>
                                    </div>
                                    
                                    
                                    <Input
                                        id="quantDose"
                                        placeholder="0"
                                        type="number"
                                        label="Doses Necessárias"
                                        value={formikVacinacao.values.quantDose}
                                        onChange={formikVacinacao.handleChange}
                                        error={hasFormErrorVacinacao(formikVacinacao, "quantDose")}
                                    />  

                                    <Input
                                        id="tipoVacinacao"
                                        placeholder="Nome Vacina"
                                        type="text"
                                        label="Nome Vacina"
                                        value={formikVacinacao.values.tipoVacinacao}
                                        onChange={formikVacinacao.handleChange}
                                        error={hasFormErrorVacinacao(formikVacinacao, "tipoVacinacao")}
                                    />  
                                </div>
                                
                                <div className="container-submit">
                                    <Button type="submit" variant="contained"> Enviar </Button>
                                </div>
                                
                            </form>

                        </div>

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

                        {/* <FormCadastroAplicacao/> */}

                        <div className="container-form">

                            <form onSubmit={formikAplicacao.handleSubmit}> 

                                <div className="form-container-inputs">
                                    <Input
                                        id="id"
                                        options={vacinas?.map(vacina => ({value: vacina.id, label: vacina.tipoVacinacao}))}
                                        placeholder="Escolha a Vacina"
                                        type="select"
                                        label="Vacina"
                                        value={formikAplicacao.values.id}
                                        onChange={formikAplicacao.handleChange}
                                        error={hasFormErrorAplicacao(formikAplicacao, "id")}
                                    />

                                    <div>
                                        <label className="form-label" htmlFor="dataUltimaDoseAplicada">
                                            Data Dose
                                        </label>

                                        <input 
                                            className="form-control"
                                            id="dataUltimaDoseAplicada"
                                            type="date"
                                            value={formikAplicacao.values.dataUltimaDoseAplicada}
                                            onChange={formikAplicacao.handleChange}
                                        ></input>

                                    </div>
                                    
                                    
                                    <Input
                                        id="quantDoseAplicada"
                                        placeholder="0"
                                        type="number"
                                        label="Doses Aplicadas"
                                        value={formikAplicacao.values.quantDose}
                                        onChange={formikAplicacao.handleChange}
                                        error={hasFormErrorAplicacao(formikAplicacao, "quantDose")}
                                    />  

                                </div>
                                
                                <div className="container-submit">
                                    <Button type="submit" variant="contained"> Enviar </Button>
                                </div>
                                
                            </form>

                        </div>

                    </div>
                </Box>
                

            </Modal>
        
            {/* FIM MODAL CADASTRO APLICACAO VACINA*/}

        </Fragment>
    )
}