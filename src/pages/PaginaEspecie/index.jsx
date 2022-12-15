import { Fragment, useEffect, useState } from 'react';


import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { listarEspecies, editarEspecies, recuperarEspeciePorId } from '../../actions/controllers/animaisController';
import edit from "../../append/edit-img.png";
import Input from '../../components/Inputs/inputs';

import './index.css'

export default function PaginaEspecie(props) {
    const [data, setData] = useState();
    const [openEdicao, setOpenEdicao] = useState(false)
    const style = {
        bgcolor: 'background.paper',
        boxShadow: 10,
    };

    const hasFormError = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
            return formik.errors[field];
        }

        return null;
    };

    const atualizaHookData = () => {
        listarEspecies(function (resp) {
            if (!resp.success) return window.alert("Erro na consulta ao banco, por favor tente novamente");
            setData(resp.body);
        });
    }

    const handleClickEdicao = (item) => {
        let especieId = item.id;
        recuperarEspeciePorId(especieId, function (resp) {
            if (!resp.success) return window.alert(resp.reasonPhrase)

            setOpenEdicao(true);

            formikEspecie.values.id = resp.body.id;
            formikEspecie.values.especie = resp.body.tipo;
        })
    }

    const handleClose = (tipoModal) => {
        setOpenEdicao(false);
    };

    const validationSchemaEspecie = Yup.object({
        especie: Yup.string().required("Campo obrigatório"),
    });

    const formikEspecie = useFormik({
        initialValues: {
            especie: "",
        },
        validationSchema: validationSchemaEspecie,
        onSubmit: async values => {
            try {
                const data = await editarEspecies({ "tipo": values.especie, "id": values.id });
                if (!!data?.success) {
                    handleClose('especie');
                    atualizaHookData();
                    window.alert('Espécie editada com sucesso');
                    formikEspecie.values.especie = "";
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

            <span className="th-titulo-tabela">Espécies Cadastrados</span>

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
                            Editar
                        </th>

                    </tr>


                </thead>

                <tbody>
                    {data?.map((item, index, arr) => (

                        <tr className="table-tablebody-row" key={item.id}>
                            <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                                {item.id}
                            </td>

                            <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                                {item.tipo}
                            </td>

                            <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                                <img className="img-editar" onClick={(e) => handleClickEdicao(item)} src={edit} alt="Botao de Edição" />
                            </td>

                        </tr>
                    ))}


                </tbody>


            </table>

            <span className="th-footer-tabela">Quantidade de Raças cadastradas: {data?.length}</span>

            {/* MODAL CADASTRO ESPECIE*/}

            <Modal
                id="modal-edicao-especie"
                open={openEdicao}
                onClose={() => handleClose('especieEdit')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box id="modal-cadastro-especie-dropshadow" sx={style}>

                    <div className="modal-container" style={{ ...style, width: 600 }}>

                        <h4 className="titulo-modal"> CADASTRO ESPECIE </h4>

                        <div className="container-form">

                            <form onSubmit={formikEspecie.handleSubmit}>

                                <div className="">

                                    <Input
                                        id="idEspecie"
                                        placeholder="Id"
                                        type="text"
                                        label="Id Espécie"
                                        value={formikEspecie.values.id}
                                        onChange={formikEspecie.handleChange}
                                        error={hasFormError(formikEspecie, "especie")}
                                        disabled={true}
                                    />

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



        </Fragment>
    )
}