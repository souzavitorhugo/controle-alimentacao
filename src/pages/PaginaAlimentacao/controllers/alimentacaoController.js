import {API_URL} from '../../../actions/util';
import axios from 'axios';

export async function importaDadosAlimentacao(){

    // axios({
    //     method: 'get',
    //     url: API_URL+'/api/Alimentacao/ListarAlimentacoes',
    //     responseType: "json",
    // }).then((resp) => {
    //     let lista = resp.data.body;
    //     return lista
    // }).catch((err) => {
    //     throw err;
    // })

    let response = await fetch(`${API_URL}/api/Alimentacao/ListarAlimentacoes`);
    let dados = await response.json();

    if(!dados.success){
        let stringErro = "Erro na consulta ao banco, por favor tente novamente"
        return stringErro
    }

    return dados.body
}