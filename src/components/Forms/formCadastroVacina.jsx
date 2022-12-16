import { useState, useEffect } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';

import { listarRFID } from '../../actions/controllers/rfidController';
import { cadastrarVacinas } from '../../actions/controllers/vacinacaoController';

import Input from '../Inputs/inputs'

export default function FormCadastroVacina() {
    const [listaRfids, setListaRfids] = useState();

    const hasFormError = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
          return formik.errors[field];
        }
      
        return null;
    };

    const validationSchema = Yup.object({
        rfid: Yup.number().required("Campo obrigatório"),
        dataAplicacao: Yup.string().required("Campo obrigatório"),
        quantDose: Yup.number().required("Campo obrigatório"),
        tipoVacinacao: Yup.string().required("Campo obrigatório")
    });

    useEffect(() => {
        atualizaHookListaRFID();
    }, [])

    const atualizaHookListaRFID = async () => {
        try {
            const listaRfids = await listarRFID();

            if(!!listaRfids) {
                let listaRetornoAPI = listaRfids;
                let listaInativos = listaRetornoAPI.filter(item => item.emUso === false);
                setListaRfids(listaInativos);
            }
        } catch (err) {
            throw err.reasonPhrase ? window.alert(err.reasonPhrase) : window.alert(err.message);
        }
    }

    const formik = useFormik({
        initialValues: {
            rfid: "",
            dataAplicacao: "",
            quantDose: "",
            tipoVacinacao: "",
            emAplicacao: false,
        },
        validationSchema,
        onSubmit: async values => {

          const dtoCadastro = {
            "codigoRfId": parseInt(values.rfid),
            "dataInicioAplicacao": values.dataAplicacao,
            "quantDose": parseInt(values.quantDose),
            "tipoVacinacao": values.tipoVacinacao,
            "emAplicacao": false
          };

          try{
            const data = await cadastrarVacinas(dtoCadastro);
            if(!!data?.success){
                window.location.reload();
            }
          } catch (err) {
            alert(err.message);
          }
        },
    });

    return (
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

                    <div>
                        <label className="form-label" htmlFor="dataNascimento">
                            Data Primeira Aplicação
                        </label>

                        <input 
                        className="form-control"
                        id="dataAplicacao"
                        type="date"
                        value={formik.values.dataAplicacao}
                        onChange={formik.handleChange}
                        ></input>
                    </div>
                    
                    
                    <Input
                        id="quantDose"
                        placeholder="0"
                        type="number"
                        label="Doses Necessárias"
                        value={formik.values.quantDose}
                        onChange={formik.handleChange}
                        error={hasFormError(formik, "quantDose")}
                    />  

                    <Input
                        id="tipoVacinacao"
                        placeholder="Nome Vacina"
                        type="text"
                        label="Nome Vacina"
                        value={formik.values.tipoVacinacao}
                        onChange={formik.handleChange}
                        error={hasFormError(formik, "tipoVacinacao")}
                    />  
                </div>
                
                <div className="container-submit">
                    <Button type="submit" variant="contained"> Enviar </Button>
                </div>
                
            </form>

        </div>

    )
}