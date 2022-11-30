import { API_URL, defaults} from '../util';
import axios from 'axios';

export async function listarVacinacoes(callback){

    axios.get(`${API_URL}/Listar`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}

export async function cadastrarVacinas(dto, callback){
    const response = await fetch(`${API_URL}/Inserir`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}

export async function aplicarVacina(dto, callback){
    const response = await fetch(`${API_URL}/Aplicacao`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}

