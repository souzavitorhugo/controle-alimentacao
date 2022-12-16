import { useState, useEffect } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';

import { listarVacinacoes, aplicarVacina } from '../../actions/controllers/vacinacaoController';

import Input from '../Inputs/inputs'

export default function FormCadastroAplicacao() {
    const [vacinas, setVacinas] = useState();

    const hasFormError = (formik, field) => {
        if (!!formik.errors[field] && formik.touched[field]) {
          return formik.errors[field];
        }
      
        return null;
    };

    const validationSchema = Yup.object({
        id: Yup.number().required("Campo obrigatório"),
        dataUltimaDoseAplicada: Yup.string().required("Campo obrigatório"),
        quantDoseAplicada: Yup.number().required("Campo obrigatório"),
    });

    useEffect(() => {
        atualizaHookVacinas();
    }, [])

    const atualizaHookVacinas = async () => {
        const listaVacinas = await listarVacinacoes();

        if(!!listaVacinas) {
            let listaRetornoAPI = listaVacinas;
            setVacinas(listaRetornoAPI);
        }
    }

    const formik = useFormik({
        initialValues: {
            id: "",
            dataUltimaDoseAplicada: "",
            quantDoseAplicada: ""
        },
        validationSchema,
        onSubmit: async values => {

          const dtoCadastro = {
            "id": parseInt(values.id),
            "dataUltimaDoseAplicada": values.dataUltimaDoseAplicada,
            "quantDoseAplicada": parseInt(values.quantDoseAplicada),
          };

          try{
            const data = await aplicarVacina(dtoCadastro);
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
                        id="id"
                        options={vacinas?.map(vacina => ({value: vacina.id, label: vacina.tipoVacinacao}))}
                        placeholder="Escolha a Vacina"
                        type="select"
                        label="Vacina"
                        value={formik.values.id}
                        onChange={formik.handleChange}
                        error={hasFormError(formik, "id")}
                    />

                    <div>
                        <label className="form-label" htmlFor="dataUltimaDoseAplicada">
                            Data Dose
                        </label>

                        <input 
                            className="form-control"
                            id="dataUltimaDoseAplicada"
                            type="date"
                            value={formik.values.dataUltimaDoseAplicada}
                            onChange={formik.handleChange}
                        ></input>

                    </div>
                    
                    
                    <Input
                        id="quantDoseAplicada"
                        placeholder="0"
                        type="number"
                        label="Doses Aplicadas"
                        value={formik.values.quantDose}
                        onChange={formik.handleChange}
                        error={hasFormError(formik, "quantDose")}
                    />  

                </div>
                
                <div className="container-submit">
                    <Button type="submit" variant="contained"> Enviar </Button>
                </div>
                
            </form>

        </div>

    )
}