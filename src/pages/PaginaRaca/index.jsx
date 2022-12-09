import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'
import Header from '../../components/Header/index';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { listarRacas, recuperarRacaPorId, editarRaca, listarEspecies } from '../../actions/controllers/animaisController';
import edit from "./append/edit-img.png";
import Input from '../../components/Inputs/inputs';

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";

import './index.css'

export default function PaginaRaca(props) {
    const [data, setData] = useState();
    const [openEdicao, setOpenEdicao] = useState(false);
    const [listaEspecie, setListaEspecie] = useState();

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 10,
    };

    const handleClose = (tipoModal) => {
        setOpenEdicao(false);
    };

    const validationSchemaRaca = Yup.object({
        animal: Yup.number().required("Campo obrigatório"),
        raca: Yup.string().required("Campo obrigatório"),
    });


    const hasFormError = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
          return formik.errors[field];
        }
      
        return null;
    };

    const handleClickEdicao = (item) => {
        let especieId = item.id;
        recuperarRacaPorId(especieId, function(resp) {
            if(!resp.success) return window.alert(resp.reasonPhrase)

            setOpenEdicao(true);

            formikRaca.values.id = resp.body.id;
            formikRaca.values.raca = resp.body.raca;
            formikRaca.values.animal = resp.body.tipoAnimal.id;

        })
    }

    const atualizaHookData = () => {
        listarRacas(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco, por favor tente novamente");
            setData(resp.body);
        });

        listarEspecies(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das espécies, por favor tente novamente");
            setListaEspecie(resp.body);
        })
    }

    const formikRaca = useFormik({
        initialValues: {
            animal: "",
            raca: "",
        },
        validationSchema: validationSchemaRaca,
        onSubmit: async values => {
          const dtoCadastro = {
            "id": values.id,
            "raca": values.raca,
            "codigoTipoAnimal": values.animal
          };
          debugger;
          try{
            const data = await editarRaca(dtoCadastro);
            if(!!data?.success){
                handleClose('raca');
                atualizaHookData();
                window.alert('Raça editada com sucesso');
                formikRaca.values.animal = "";
                formikRaca.values.raca = "";
            } else {
                window.alert(data.reasonPhrase);
            }
          } catch (err) {
            window.alert(err.reasonPhrase);
          }
        },
    });


    useEffect(() => {
        atualizaHookData();
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

                        <span className="th-titulo-tabela">Raças Cadastrados</span>

                        <table className="container-table">
                                
                            <thead>
                    
                                <tr>
                                    <th className="table-header-border">
                                        Identificador
                                    </th> 

                                    <th className="table-header-border">
                                        Nome
                                    </th> 

                                    <th className="table-header-border">
                                        Espécie
                                    </th> 

                                    <th className="table-header-border">
                                        Editar
                                    </th> 

                                </tr>
                                
                                
                            </thead>

                            <tbody>
                                {data?.map((item, index, arr) => (

                                    <tr className="table-tablebody-row" key={item.id}> 
                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.id}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.raca}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.tipoAnimal.tipo}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            <img className="img-editar" onClick={(e) => handleClickEdicao(item)} src={edit} alt="Botao de Edição" />
                                        </td>

                                    </tr>
                                ))}

                                
                            </tbody>

                            
                        </table>

                        <span className="th-footer-tabela">Quantidade de Raças cadastradas: {data?.length}</span>
                    </main>
                    
                </section>

            </div>

            {/* MODAL edicao RACA*/}

                <Modal
                    id="modal-edicao-raca"
                    open={openEdicao}
                    onClose={() => handleClose('raca')}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box id="modal-cadastro-animal-dropshadow" sx={style}>
                        <div className="modal-container" style={{...style, width: 600}}>

                            <h4 className="titulo-modal"> EDIÇÃO RAÇAS </h4>
                                
                            <div className="container-form">

                                <form onSubmit={formikRaca.handleSubmit}> 

                                    <div className="form-container-inputs">

                                        <Input
                                            id="idRaca"
                                            placeholder="Id"
                                            type="text"
                                            label="Id Raça"
                                            value={formikRaca.values.id}
                                            onChange={formikRaca.handleChange}
                                            error={hasFormError(formikRaca, "id")}
                                            disabled={true}
                                        />  


                                        <Input
                                            id="animal"
                                            options={listaEspecie?.map(tipoAnimal => ({value: tipoAnimal.id, label: tipoAnimal.tipo}))}
                                            placeholder="Escolha o Animal"
                                            type="select"
                                            label="Animal"
                                            value={formikRaca.values.animal}
                                            onChange={formikRaca.handleChange}
                                            error={hasFormError(formikRaca, "animal")}
                                            disabled={true}
                                        />

                                        <Input
                                            id="raca"
                                            placeholder="Raça"
                                            type="text"
                                            label="Raça"
                                            value={formikRaca.values.raca}
                                            onChange={formikRaca.handleChange}
                                            error={hasFormError(formikRaca, "raca")}
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
            
            {/* FIM MODAL edicao RACA*/} 
 
        </Fragment>
    )
}