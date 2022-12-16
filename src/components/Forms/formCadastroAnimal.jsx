import { useState, useEffect } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';

import { listarRFID } from '../../actions/controllers/rfidController';
import { listarRacas, listarEspecies, cadastrarAnimais } from '../../actions/controllers/animaisController';

import Input from '../Inputs/inputs'

export default function FormCadastroTeste() {
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

    useEffect(() => {
        atualizaHookListaRFID();

        listarEspecies(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das especies, por favor tente novamente");
            setListaTiposAnimais(resp.body);
        })
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
          debugger;
          try{
            const data = await cadastrarAnimais(dtoCadastro);
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

    )
}