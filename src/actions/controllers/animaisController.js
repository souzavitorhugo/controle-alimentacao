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

export async function cadastrarEspecies(dto, callback){
    const response = await fetch(`${API_URL}/api/Animal/CadastrarEspecie`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}

export async function cadastrarRacas(dto, callback){
    const response = await fetch(`${API_URL}/api/Animal/CadastrarRaca`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}

export async function recuperarAnimalPorId(id,callback) {
    axios.get(`${API_URL}/api/Animal/BuscarAnimal/${id}`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}

export async function editarAnimais(dto, callback){
    const response = await fetch(`${API_URL}/api/Animal/EditarAnimal`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}

export async function recuperarEspeciePorId(id,callback) {
    axios.get(`${API_URL}/api/Animal/BuscarEspecie/${id}`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}

export async function editarEspecies(dto, callback){
    const response = await fetch(`${API_URL}/api/Animal/EditarEspecie`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}

export async function recuperarRacaPorId(id,callback) {
    axios.get(`${API_URL}/api/Animal/BuscarRaca/${id}`)
        .then(function(response) {
            callback(response.data);
        })
        .catch(function(response){
            callback(response);
        })
}

export async function editarRaca(dto, callback){
    const response = await fetch(`${API_URL}/api/Animal/EditarRaca`, {
        method: 'POST',
        headers: defaults.headers,
        body: JSON.stringify(dto)
    });

    const data = await response.json();

    return data;
}


