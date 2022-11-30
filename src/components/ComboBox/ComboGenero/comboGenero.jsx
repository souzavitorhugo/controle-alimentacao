import { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ComboGenero() {
    const [genero, setGenero] = useState('');

    const handleChangeGenero = (event) => {
        setGenero(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>

                <InputLabel id="label-select-genero">Gênero</InputLabel>

                <Select
                    labelId="label-select-genero"
                    id="select-genero"
                    value={genero}
                    label="Gênero"
                    onChange={handleChangeGenero}
                >
                    
                <MenuItem key='masc' value='1'> Masculino </MenuItem>
                <MenuItem key='fem' value='0'> Feminino </MenuItem>

                </Select>

            </FormControl>
        </Box>
    )
}