import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { listarRFID } from '../../../actions/controllers/rfidController';

export default function ComboRFID() {
    const [listaRfids, setListaRfids] = useState();

    const [rfid, setRfid] = useState('');

    const handleChange = (event) => {
        setRfid(event.target.value);
    };

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

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="label-select-rfid">RFID</InputLabel>

                <Select
                    labelId="label-select-rfid"
                    id="select-rfid"
                    value={rfid}
                    label="RFID"
                    onChange={handleChange}
                >
                    
                    {listaRfids?.map((rfid) => (
                        <MenuItem key={rfid.id} value={rfid.id}> {rfid.codigoRFID}</MenuItem>
                    ))}

                </Select>

            </FormControl>
        </Box>
    )
}