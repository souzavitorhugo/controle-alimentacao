import {API_URL} from '../../../actions/util';
import axios from 'axios';

export async function importaDadosAlimentacao(){
    const lista = {};

    axios({
        method: 'get',
        url: API_URL+'/api/Alimentacao/ListarAlimentacoes',
        responseType: "json",
    }).then((resp) => {
        debugger;
        lista = resp;
        return lista
    }).catch((resp) => {
        debugger;
    })
        
    return lista;
}