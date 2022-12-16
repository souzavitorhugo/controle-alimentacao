import { API_URL, defaults} from '../util';
import axios from 'axios';

import {AxiosInstance} from '../util';

export const listarVacinacoes = async () => {
    AxiosInstance.get("/Listar")
    .then((resp) => {
        return resp.data.body
    })
}

export const cadastrarVacinas = async (dto) => {
    return AxiosInstance.post("/Inserir", dto)
    .then((resp) => {
       return resp.data        
    })
}

export const aplicarVacina = async (dto) => {
    return AxiosInstance.post("/Aplicacao", dto)
    .then((resp) => {
       return resp.data        
    })
}
