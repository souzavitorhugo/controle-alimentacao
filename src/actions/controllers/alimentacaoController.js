import {API_URL} from '../util';
import axios from 'axios';

export async function listarAlimentacoes(callback){

    axios.get(`${API_URL}/api/Alimentacao/ListarAlimentacoes`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}