import { useState, useEffect, Fragment } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { listarRacas, listarEspecies } from '../../../actions/controllers/animaisController';

export default function ComboRacaTipoAnimal() {
    const [listaRacas, setListaRacas] = useState();
    const [listaEspecies, setListaEspecies] = useState();


    const [racas, setRacas] = useState('');
    const [tiposAnimais, setTiposAnimais] = useState('');


    const handleChangeRaca = (event) => {
        setRacas(event.target.value);
    };

    const handleChangeEspecies = (event) => {
        setTiposAnimais(event.target.value);

        const DadosListaRaca = callListarRacas();


        listarRacas(function(resp) {
            if(!resp.success) return window.alert("Erro na consulta ao banco das raças, por favor tente novamente");

            let listaRetornoAPI = resp.body;
            let listaFiltrada = listaRetornoAPI.filter(item => item.tipoAnimal.id === event.target.value)
            setListaRacas(listaFiltrada);
        })

    }

    const callListarRacas = async () => {
        try {
            const data = await listarRacas();
            if(!!data) debugger;
        } catch(err) {
            
        }
    }

    useEffect(() => {

        atualizaHookEspecies();
        
    }, [])

    const atualizaHookEspecies = async () => {
        try {
            const dadosListaEspecie = await listarEspecies();
            if(!!dadosListaEspecie) setListaEspecies(dadosListaEspecie);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="label-select-tipo-animal">Animal</InputLabel>

                    <Select
                        labelId="label-select-tipo-animal"
                        id="select-animal"
                        value={tiposAnimais}
                        label="Tipo Animal"
                        onChange={handleChangeEspecies}
                    >
                        
                        {listaEspecies?.map((tipoAnimal) => (
                            <MenuItem key={tipoAnimal.id} value={tipoAnimal.id}> {tipoAnimal.tipo}</MenuItem>
                        ))}

                    </Select>

                </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="label-select-racas">Raças</InputLabel>

                    <Select
                        labelId="label-select-racas"
                        id="select-racas"
                        value={racas}
                        label="Raça"
                        onChange={handleChangeRaca}
                    >
                        
                        {listaRacas?.map((raca) => (
                            <MenuItem key={raca.id} value={raca.id}> {raca.raca}</MenuItem>
                        ))}

                    </Select>

                </FormControl>
            </Box>

        </Fragment>
        
    )
}