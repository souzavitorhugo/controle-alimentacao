import {API_URL, defaults} from '../util';

import axios from 'axios';

export async function listarAnimais(callback) {
    axios.get(`${API_URL}/api/Animal/ListarAnimais`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}

export async function listarRacas(callback) {
    axios.get(`${API_URL}/api/Animal/ListarRacas`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}

export async function listarEspecies(callback) {
    axios.get(`${API_URL}/api/Animal/ListarEspecies`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}

export async function cadastrarAnimais(dto, callback){
    const response = await fetch(`${API_URL}/api/Animal/CadastrarAnimais`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}


