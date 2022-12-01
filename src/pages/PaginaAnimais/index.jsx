import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import Header from '../../components/Header/index';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import { listarRFID } from '../../actions/controllers/rfidController';
import { listarRacas, listarEspecies, cadastrarAnimais, listarAnimais } from '../../actions/controllers/animaisController';

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";
import Input from '../../components/Inputs/inputs';

import './index.css'

export default function PaginaAnimais(props) {
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);

    const [listaRfids, setListaRfids] = useState();
    const [listaTiposAnimais, setListaTiposAnimais] = useState();

    const [tiposAnimais, setTiposAnimais] = useState('');
    const [listaRacas, setListaRacas] = useState();
    const [disabled, setDisabled] = useState(true);

    const hasFormError = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
          return formik.errors[field];
        }
      
        return null;
    };

    const handleChangeEspecies = (event) => {
        setTiposAnimais(event.target.value)

        listarRacas(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das raças, por favor tente novamente");

            let listaRetornoAPI = resp.body;
            let listaFiltrada = listaRetornoAPI.filter(item => item.tipoAnimal.id == event.target.value)
            setDisabled(false);
            setListaRacas(listaFiltrada);
        })
    }

    const validationSchema = Yup.object({
        rfid: Yup.number().required("Campo obrigatório"),
        animal: Yup.number().required("Campo obrigatório"),
        raca: Yup.number().required("Campo obrigatório"),
        genero: Yup.number().required("Campo obrigatório"),
        peso: Yup.string().required("Campo obrigatório")
    });

    const formik = useFormik({
        initialValues: {
            rfid: "",
            animal: "",
            raca: "",
            dataNascimento: "",
            genero: "",
            peso: ""
        },
        validationSchema,
        onSubmit: async values => {
          const dtoCadastro = {
            "codigoRfId": parseInt(values.rfid),
            "codigoTipoAnimal": parseInt(values.animal),
            "codigoRaca": parseInt(values.raca),
            "dataNacimento": values.dataNascimento,
            "peso": parseInt(values.peso),
            "genero": values.genero == 1 ? true : false
          };

          try{
            const data = await cadastrarAnimais(dtoCadastro);
            if(!!data?.success){
                handleClose();
                atualizaHookData();
                atualizaHookRFID();
                atualizaHookEspecies();
                window.alert('Animal cadastrado com sucesso');
                formik.rfid = "";
                formik.animal = "";
                formik.raca = "";
                formik.dataNascimento = "";
                formik.genero = "";
                formik.peso = "";
            } else {
                window.alert(data.reasonPhrase);
            }
          } catch (err) {
            window.alert(err.reasonPhrase);
          }
        },
    });

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 10,
    };

    const atualizaHookData = () => {
        listarAnimais(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco, por favor tente novamente");
            setData(resp.body);
        });
    }

    const atualizaHookRFID = () => {
        listarRFID(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das raças, por favor tente novamente");
            
            let listaRetornoAPI = resp.body;
            let listaInativos = listaRetornoAPI.filter(item => item.emUso === false && item.ativo === true);
            setListaRfids(listaInativos);
        });
    }

    const atualizaHookEspecies = () => {
        listarEspecies(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das especies, por favor tente novamente");
            setListaTiposAnimais(resp.body);
        })
    }

    useEffect(() => {
        atualizaHookData();

        atualizaHookRFID();

        atualizaHookEspecies();
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

                        <Button variant="contained" onClick={handleOpen}> Novo </Button>

                        <span className="th-titulo-tabela">Animais Cadastrados</span>

                        <table className="container-table">
                                
                            <thead>
                    
                                <tr>
                                    <th className="table-header-border">
                                        Identificador (RFID)
                                    </th> 

                                    <th className="table-header-border">
                                        Raça
                                    </th> 

                                    <th className="table-header-border">
                                        Estado Animal
                                    </th> 

                                    <th className="table-header-border">
                                        Último Peso
                                    </th>

                                    <th className="table-header-border">
                                        Data Nascimento
                                    </th> 

                                    <th className="table-header-border">
                                        Data abate
                                    </th> 

                                    <th className="table-header-border">
                                        Tipo Animal
                                    </th> 

                                    <th className="table-header-border">
                                        Gênero
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
                                            {item.raca.raca}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {!item.abat_Morte ? "Vivo" : "Abatido"}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.peso}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.dataNacimento}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {!item.abat_Morte ? "-" : item.dataAbat_Morte}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.tipoAnimal.tipo}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.genero ? "Macho" : "Fêmea"}
                                        </td>
                                    </tr>
                                ))}

                                
                            </tbody>

                            
                        </table>

                        <span className="th-footer-tabela">Quantidade de animais cadastrados:{data?.length}</span>
                    </main>
                    
                </section>

            </div>

            {/* MODAL CADASTRO ANIMAL*/}

            <Modal
                id="modal-cadastro-animal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-animal-dropshadow" sx={style}>
                    <div className="modal-container" style={{...style, width: 600}}>

                        <h4 className="titulo-modal"> CADASTRO </h4>
                            
                        <div className="container-form">

                            <form onSubmit={formik.handleSubmit}> 

                                <div className="form-container-inputs">
                                    <Input
                                        id="rfid"
                                        options={listaRfids?.map(rfid => ({value: rfid.id, label: rfid.codigoRFID}))}
                                        placeholder="Escolha o RFID"
                                        type="select"
                                        label="RFID"
                                        value={formik.values.rfid}
                                        onChange={formik.handleChange}
                                        error={hasFormError(formik, "rfid")}
                                    />

                                    <Input
                                        id="animal"
                                        options={listaTiposAnimais?.map(tipoAnimal => ({value: tipoAnimal.id, label: tipoAnimal.tipo}))}
                                        placeholder="Escolha o Animal"
                                        type="select"
                                        label="Animal"
                                        value={formik.values.animal}
                                        onChange={(e) => {formik.handleChange(e); handleChangeEspecies(e)}}
                                        error={hasFormError(formik, "animal")}
                                    />

                                    <Input
                                        id="raca"
                                        options={listaRacas?.map(raca => ({value: raca.id, label: raca.raca}))}
                                        placeholder="Escolha a Raça"
                                        type="select"
                                        label="Raça"
                                        value={formik.values.raca}
                                        onChange={formik.handleChange}
                                        error={hasFormError(formik, "raca")}
                                        disabled={!!disabled}
                                    />

                                    <div>
                                        <label className="form-label" htmlFor="dataNascimento">
                                            Data Nascimento
                                        </label>

                                        <input 
                                        className="form-control"
                                        id="dataNascimento"
                                        type="date"
                                        value={formik.values.dataNascimento}
                                        onChange={formik.handleChange}
                                        error={hasFormError(formik, "dataNascimento")}
                                        ></input>
                                    </div>
                                    
                                    
                                    <Input
                                        id="genero"
                                        options={[{value: 1, label: 'Macho'}, {value: 0, label: 'Fêmea'}]}
                                        placeholder="Gênero"
                                        type="select"
                                        label="Gênero"
                                        value={formik.values.genero}
                                        onChange={formik.handleChange}
                                        error={hasFormError(formik, "genero")}
                                    />  

                                    <Input
                                        id="peso"
                                        placeholder="Peso (Kg)"
                                        type="text"
                                        label="Peso (Kg)"
                                        value={formik.values.peso}
                                        onChange={formik.handleChange}
                                        error={hasFormError(formik, "peso")}
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
        
            {/* FIM MODAL CADASTRO ANIMAL*/}

        </Fragment>
    )
}