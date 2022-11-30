import {API_URL} from '../util';

import axios from 'axios';

export async function listarRFID(callback) {
    axios.get(`${API_URL}/api/RFID/ListarRfids`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}