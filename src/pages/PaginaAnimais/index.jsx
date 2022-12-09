import {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import Header from '../../components/Header/index';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import { listarRFID } from '../../actions/controllers/rfidController';

import { listarRacas, listarEspecies, 
        cadastrarAnimais, listarAnimais, 
        cadastrarEspecies, cadastrarRacas, 
        recuperarAnimalPorId, editarAnimais } from '../../actions/controllers/animaisController';

import burguerImg from "./append/burguer-menu.png";
import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";
import Input from '../../components/Inputs/inputs';
import edit from "./append/edit-img.png";

import './index.css'

export default function PaginaAnimais(props) {
    const [data, setData] = useState();
    const [openAnimal, setOpenAnimal] = useState(false);
    const [openAnimalEdicao, setOpenAnimalEdicao] = useState(false);

    const [openEspecie, setOpenEspecie] = useState(false);
    const [openRaca, setOpenRaca] = useState(false);

    const [listaRfids, setListaRfids] = useState();
    const [listaTiposAnimais, setListaTiposAnimais] = useState();

    const [tiposAnimais, setTiposAnimais] = useState('');
    const [listaRacas, setListaRacas] = useState();
    const [disabled, setDisabled] = useState(true);
    const [disabledAbate, setDisabledAbate] = useState(true);

    const hasFormError = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
          return formik.errors[field];
        }
      
        return null;
    };

    const handleClickEdicao = (item) => {
        let animalId = item.id;
        recuperarAnimalPorId(animalId, function(resp) {
            if(!resp.success) return window.alert(resp.reasonPhrase)

            setOpenAnimalEdicao(true);
            atualizaHookRFID('todos');

            formikAnimalEdicao.values.id = resp.body.id;
            formikAnimalEdicao.values.rfid = resp.body.codigoRfId;
            formikAnimalEdicao.values.animal = resp.body.tipoAnimal.id;
            formikAnimalEdicao.values.raca = resp.body.raca.id;
            formikAnimalEdicao.values.dataNascimento = resp.body.dataNacimento.split('T')[0];
            formikAnimalEdicao.values.genero = resp.body.genero === true ? 1 : 0;
            formikAnimalEdicao.values.peso = resp.body.peso;
            formikAnimalEdicao.values.abate = resp.body.abat_Morte  === true ? 0 : 1;
        })
    }

    const handleChangeEspecies = (event) => {
        listarRacas(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das raças, por favor tente novamente");

            let listaRetornoAPI = resp.body;
            let listaFiltrada = listaRetornoAPI.filter(item => item.tipoAnimal.id == event.target.value)
            setDisabled(false);
            setListaRacas(listaFiltrada);
        })
    }

    const handleChangeStatusAnimal = (e) => {
        if(e.target.value === '1') return setDisabledAbate(true);
        setDisabledAbate(false);
    }

    const validationSchemaAnimal = Yup.object({
        rfid: Yup.number().required("Campo obrigatório"),
        animal: Yup.number().required("Campo obrigatório"),
        raca: Yup.number().required("Campo obrigatório"),
        genero: Yup.number().required("Campo obrigatório"),
        peso: Yup.string().required("Campo obrigatório")
    });

    const formikAnimalEdicao = useFormik({
        initialValues: {
            rfid: "",
            animal: "",
            raca: "",
            dataNascimento: "",
            genero: "",
            peso: ""
        },
        validationSchema: validationSchemaAnimal,
        onSubmit: async values => {
          const dtoCadastro = {
            "id": parseInt(values.id),
            "codigoRfId": parseInt(values.rfid),
            "codigoTipoAnimal": parseInt(values.animal),
            "codigoRaca": parseInt(values.raca),
            "dataNacimento": values.dataNascimento,
            "peso": parseInt(values.peso),
            "genero": values.genero == 1 ? true : false,
            "abat_Morte": values.abate == 1 ? false : true,
            "dataAbat_Morte": !values.abate ? null : values.dataAbate
          };
          
          try{
            const data = await editarAnimais(dtoCadastro);
            if(!!data?.success){
                handleClose('animalEdicao');
                atualizaHookData();
                atualizaHookRFID('ativos');
                atualizaHookEspecies();
                window.alert('Animal alterado com sucesso');
                formikAnimalEdicao.values.rfid = "";
                formikAnimalEdicao.values.animal = "";
                formikAnimalEdicao.values.raca = "";
                formikAnimalEdicao.values.dataNascimento = "";
                formikAnimalEdicao.values.genero = "";
                formikAnimalEdicao.values.peso = "";
            } else {
                window.alert(data.reasonPhrase);
            }
          } catch (err) {
            window.alert(err.reasonPhrase);
          }
        },
    });

    const formikAnimal = useFormik({
        initialValues: {
            rfid: "",
            animal: "",
            raca: "",
            dataNascimento: "",
            genero: "",
            peso: ""
        },
        validationSchema: validationSchemaAnimal,
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
                handleClose('animal');
                atualizaHookData();
                atualizaHookRFID('ativos');
                atualizaHookEspecies();
                window.alert('Animal cadastrado com sucesso');
                formikAnimal.values.rfid = "";
                formikAnimal.values.animal = "";
                formikAnimal.values.raca = "";
                formikAnimal.values.dataNascimento = "";
                formikAnimal.values.genero = "";
                formikAnimal.values.peso = "";
            } else {
                window.alert(data.reasonPhrase);
            }
          } catch (err) {
            window.alert(err.reasonPhrase);
          }
        },
    });

    const validationSchemaEspecie = Yup.object({
        especie: Yup.string().required("Campo obrigatório"),
    });

    const formikEspecie = useFormik({
        initialValues: {
            especie: "",
        },
        validationSchema: validationSchemaEspecie,
        onSubmit: async values => {
          try{
            const data = await cadastrarEspecies(values.especie);
            if(!!data?.success){
                handleClose('especie');
                atualizaHookData();
                atualizaHookRFID('ativos');
                atualizaHookEspecies();
                window.alert('Espécie cadastrada com sucesso');
                formikEspecie.values.especie = "";
            } else {
                window.alert(data.reasonPhrase);
            }
          } catch (err) {
            window.alert(err.reasonPhrase);
          }
        },
    });

    const validationSchemaRaca = Yup.object({
        animal: Yup.number().required("Campo obrigatório"),
        raca: Yup.string().required("Campo obrigatório"),
    });

    const formikRaca = useFormik({
        initialValues: {
            animal: "",
            raca: "",
        },
        validationSchema: validationSchemaRaca,
        onSubmit: async values => {
          const dtoCadastro = {
            "raca": values.raca,
            "codigoTipoAnimal": parseInt(values.animal),
          };

          try{
            const data = await cadastrarRacas(dtoCadastro);
            if(!!data?.success){
                handleClose('raca');
                atualizaHookData();
                atualizaHookRFID('ativos');
                atualizaHookEspecies();
                window.alert('Raça cadastrada com sucesso');
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

    const atualizaHookRFID = (tipo) => {
        if(tipo === 'ativos') {
            listarRFID(function(resp) {
                if(!resp.success) return window.alert("Erro na consulta ao banco das raças, por favor tente novamente");
                
                let listaRetornoAPI = resp.body;
                let listaInativos = listaRetornoAPI.filter(item => item.emUso === false && item.ativo === true);
                setListaRfids(listaInativos);
            });
        }

        if(tipo === 'todos'){
            listarRFID(function(resp) {
                if(!resp.success) return window.alert("Erro na consulta ao banco das raças, por favor tente novamente");
                
                let listaRetornoAPI = resp.body;
                setListaRfids(listaRetornoAPI);
            });
        }
        
    }

    const atualizaHookEspecies = () => {
        listarEspecies(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das especies, por favor tente novamente");
            setListaTiposAnimais(resp.body);
        })
    }

    useEffect(() => {
        atualizaHookData();

        atualizaHookRFID('ativos');

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

    const handleOpen = (tipoModal) => {
        if(tipoModal === 'animal') {
            setOpenAnimal(true);
            atualizaHookRFID('ativos')
        }

        if(tipoModal === 'raca') setOpenRaca(true);


        if(tipoModal === 'especie') setOpenEspecie(true);
    };

    const handleClose = (tipoModal) => {
        if(tipoModal === 'animal') setOpenAnimal(false);

        if(tipoModal === 'animalEdicao') setOpenAnimalEdicao(false);

        if(tipoModal === 'raca') setOpenRaca(false);

        if(tipoModal === 'especie') setOpenEspecie(false);
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

                        <Button style={{marginRight: '5px'}} variant="contained" onClick={() => handleOpen('animal')}> Novo Animal </Button>

                        <Button style={{marginRight: '5px'}} variant="contained" onClick={() => handleOpen('especie')}> Nova Espécie </Button>

                        <Button variant="contained" onClick={() => handleOpen('raca')}> Nova Raça </Button>

                        <span className="th-titulo-tabela">Animais Cadastrados</span>

                        <table className="container-table">
                                
                            <thead>
                    
                                <tr>
                                    <th className="table-header-border">
                                        Identificador (RFID)
                                    </th> 

                                    <th className="table-header-border">
                                        Tipo Animal
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
                                        Gênero
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
                                            {item.rfid.codigoRFID}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            {item.tipoAnimal.tipo}
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
                                            {item.genero ? "Macho" : "Fêmea"}
                                        </td>

                                        <td className={arr.length == index+1 ? "last-table-row" : "table-body-border"}> 
                                            <img className="img-editar" onClick={(e) => handleClickEdicao(item)} src={edit} alt="Botao de Edição" />
                                        </td>
                                    </tr>
                                ))}

                                
                            </tbody>

                            
                        </table>

                        <span className="th-footer-tabela">Quantidade de animais cadastrados: {data?.length}</span>

                        <Link to="/racas">
                            <span className="th-footer-tabela hover"> Ir para Lista Raças </span>
                        </Link>
                        
                        <Link to="/especies">
                            <span className="th-footer-tabela hover"> Ir para Lista Espécies </span>
                        </Link>

                    </main>
                    
                </section>

            </div>

            {/* MODAL CADASTRO ANIMAL*/}

            <Modal
                id="modal-cadastro-animal"
                open={openAnimal}
                onClose={() => handleClose('animal')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-animal-dropshadow" sx={style}>
                    <div className="modal-container" style={{...style, width: 600}}>

                        <h4 className="titulo-modal"> CADASTRO </h4>
                            
                        <div className="container-form">

                            <form onSubmit={formikAnimal.handleSubmit}> 

                                <div className="form-container-inputs">
                                    <Input
                                        id="rfid"
                                        options={listaRfids?.map(rfid => ({value: rfid.id, label: rfid.codigoRFID}))}
                                        placeholder="Escolha o RFID"
                                        type="select"
                                        label="RFID"
                                        value={formikAnimal.values.rfid}
                                        onChange={formikAnimal.handleChange}
                                        error={hasFormError(formikAnimal, "rfid")}
                                    />

                                    <Input
                                        id="animal"
                                        options={listaTiposAnimais?.map(tipoAnimal => ({value: tipoAnimal.id, label: tipoAnimal.tipo}))}
                                        placeholder="Escolha o Animal"
                                        type="select"
                                        label="Animal"
                                        value={formikAnimal.values.animal}
                                        onChange={(e) => {formikAnimal.handleChange(e); handleChangeEspecies(e)}}
                                        error={hasFormError(formikAnimal, "animal")}
                                    />

                                    <Input
                                        id="raca"
                                        options={listaRacas?.map(raca => ({value: raca.id, label: raca.raca}))}
                                        placeholder="Escolha a Raça"
                                        type="select"
                                        label="Raça"
                                        value={formikAnimal.values.raca}
                                        onChange={formikAnimal.handleChange}
                                        error={hasFormError(formikAnimal, "raca")}
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
                                        value={formikAnimal.values.dataNascimento}
                                        onChange={formikAnimal.handleChange}
                                        error={hasFormError(formikAnimal, "dataNascimento")}
                                        ></input>
                                    </div>
                                    
                                    
                                    <Input
                                        id="genero"
                                        options={[{value: 1, label: 'Macho'}, {value: 0, label: 'Fêmea'}]}
                                        placeholder="Gênero"
                                        type="select"
                                        label="Gênero"
                                        value={formikAnimal.values.genero}
                                        onChange={formikAnimal.handleChange}
                                        error={hasFormError(formikAnimal, "genero")}
                                    />  

                                    <Input
                                        id="peso"
                                        placeholder="Peso (Kg)"
                                        type="text"
                                        label="Peso (Kg)"
                                        value={formikAnimal.values.peso}
                                        onChange={formikAnimal.handleChange}
                                        error={hasFormError(formikAnimal, "peso")}
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

            {/* MODAL CADASTRO RACA*/}

            <Modal
                id="modal-cadastro-animal"
                open={openRaca}
                onClose={() => handleClose('raca')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-animal-dropshadow" sx={style}>
                    <div className="modal-container" style={{...style, width: 600}}>

                        <h4 className="titulo-modal"> CADASTRO RACA</h4>
                            
                        <div className="container-form">

                            <form onSubmit={formikRaca.handleSubmit}> 

                                <div className="form-container-inputs">

                                    <Input
                                        id="animal"
                                        options={listaTiposAnimais?.map(tipoAnimal => ({value: tipoAnimal.id, label: tipoAnimal.tipo}))}
                                        placeholder="Escolha o Animal"
                                        type="select"
                                        label="Animal"
                                        value={formikRaca.values.animal}
                                        onChange={formikRaca.handleChange}
                                        error={hasFormError(formikRaca, "animal")}
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
        
            {/* FIM MODAL CADASTRO RACA*/}


            {/* MODAL CADASTRO ESPECIE*/}

            <Modal
                id="modal-cadastro-especie"
                open={openEspecie}
                onClose={() => handleClose('especie')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-especie-dropshadow" sx={style}>
                    <div className="modal-container" style={{...style, width: 600}}>

                        <h4 className="titulo-modal"> CADASTRO ESPECIE </h4>
                            
                        <div className="container-form">

                            <form onSubmit={formikEspecie.handleSubmit}> 

                                <div className="">

                                    <Input
                                        id="especie"
                                        placeholder="Espécie"
                                        type="text"
                                        label="Nome Espécie"
                                        value={formikEspecie.values.especie}
                                        onChange={formikEspecie.handleChange}
                                        error={hasFormError(formikEspecie, "especie")}
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
        
            {/* FIM MODAL CADASTRO ESPECIE*/}


            {/* MODAL CADASTRO EDICAO ANIMAL */}

            <Modal
                id="modal-cadastro-animal-edicao"
                open={openAnimalEdicao}
                onClose={() => handleClose('animalEdicao')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-animal-dropshadow" sx={style}>
                    <div className="modal-container" style={{...style, width: 600}}>

                        <h4 className="titulo-modal"> Edição </h4>
                            
                        <div className="container-form">

                            <form onSubmit={formikAnimalEdicao.handleSubmit}> 

                                <div className="form-container-inputs">
                                    <Input
                                        id="rfid"
                                        options={listaRfids?.map(rfid => ({value: rfid.id, label: rfid.codigoRFID}))}
                                        placeholder="Escolha o RFID"
                                        type="select"
                                        label="RFID"
                                        value={formikAnimalEdicao.values.rfid}
                                        onChange={formikAnimalEdicao.handleChange}
                                        error={hasFormError(formikAnimalEdicao, "rfid")}
                                        disabled={true}
                                    />

                                    <Input
                                        id="animal"
                                        options={listaTiposAnimais?.map(tipoAnimal => ({value: tipoAnimal.id, label: tipoAnimal.tipo}))}
                                        placeholder="Escolha o Animal"
                                        type="select"
                                        label="Animal"
                                        value={formikAnimalEdicao.values.animal}
                                        onChange={(e) => {formikAnimalEdicao.handleChange(e); handleChangeEspecies(e)}}
                                        error={hasFormError(formikAnimalEdicao, "animal")}
                                    />

                                    <Input
                                        id="raca"
                                        options={listaRacas?.map(raca => ({value: raca.id, label: raca.raca}))}
                                        placeholder="Escolha a Raça"
                                        type="select"
                                        label="Raça"
                                        value={formikAnimalEdicao.values.raca}
                                        onChange={formikAnimalEdicao.handleChange}
                                        error={hasFormError(formikAnimalEdicao, "raca")}
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
                                        value={formikAnimalEdicao.values.dataNascimento}
                                        onChange={formikAnimalEdicao.handleChange}
                                        error={hasFormError(formikAnimalEdicao, "dataNascimento")}
                                        ></input>
                                    </div>
                                    
                                    
                                    <Input
                                        id="genero"
                                        options={[{value: 1, label: 'Macho'}, {value: 0, label: 'Fêmea'}]}
                                        placeholder="Gênero"
                                        type="select"
                                        label="Gênero"
                                        value={formikAnimalEdicao.values.genero}
                                        onChange={formikAnimalEdicao.handleChange}
                                        error={hasFormError(formikAnimalEdicao, "genero")}
                                    />  

                                    <Input
                                        id="peso"
                                        placeholder="Peso (Kg)"
                                        type="text"
                                        label="Peso (Kg)"
                                        value={formikAnimalEdicao.values.peso}
                                        onChange={formikAnimalEdicao.handleChange}
                                        error={hasFormError(formikAnimalEdicao, "peso")}
                                    />  

                                    <Input
                                        id="abate"
                                        options={[{value: 1, label: 'Vivo'}, {value: 0, label: 'Morto'}]}
                                        placeholder="Status Animal"
                                        type="select"
                                        label="Status Animal"
                                        value={formikAnimalEdicao.values.abate}
                                        onChange={(e) => {formikAnimalEdicao.handleChange(e); handleChangeStatusAnimal(e)}}
                                        error={hasFormError(formikAnimalEdicao, "abate")}
                                    />  

                                    <div>
                                        <label className="form-label" htmlFor="dataAbate">
                                            Data Nascimento
                                        </label>

                                        <input 
                                            className="form-control"
                                            id="dataAbate"
                                            type="date"
                                            value={formikAnimalEdicao.values.dataAbate}
                                            onChange={formikAnimalEdicao.handleChange}
                                            error={hasFormError(formikAnimalEdicao, "dataAbate")}
                                            disabled={!!disabledAbate}
                                        ></input>
                                    </div>
                                </div>
                                
                                <div className="container-submit">
                                    <Button type="submit" variant="contained"> Enviar </Button>
                                </div>
                                
                            </form>

                        </div>

                    </div>
                </Box>
                

            </Modal>
        
            {/* FIM MODAL CADASTRO EDICAO ANIMAL*/}

        </Fragment>
    )
}