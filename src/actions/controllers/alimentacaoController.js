import {API_URL, AxiosInstance} from '../util';

export const listarAlimentacoes = async () => {
    return AxiosInstance.get('/api/Alimentacao/ListarAlimentacoes')
        .then((resp) => {
            return resp.data.body;
        })
}

