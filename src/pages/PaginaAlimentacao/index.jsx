import { Fragment, useEffect, useState } from 'react';

import { listarAlimentacoes, consultaApi } from '../../actions/controllers/alimentacaoController';

import './index.css'

export default function PaginaAlimentacao(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        atualizaHookData();
    }, [])

    const atualizaHookData = async () => {
        try {
            const data = await listarAlimentacoes();
            setData(data)
        } catch (err) {
            throw window.alert(err.message + " Mais detalhes: "+err.response.statusText)
        }
    }

    return (
        <table className="container-table">
            <thead>

                <tr>
                    <th className="table-header-border">
                        Identificador (RFID)
                    </th>

                    <th className="table-header-border">
                        Último Peso
                    </th>

                    <th className="table-header-border">
                        Data Entrada
                    </th>

                    <th className="table-header-border">
                        Data Saída
                    </th>

                    <th className="table-header-border">
                        Hora Entrada
                    </th>

                    <th className="table-header-border">
                        Hora Saída
                    </th>
                </tr>


            </thead>

            <tbody>
                {data?.map((item, index, arr) => (
                    <tr className="table-tablebody-row" key={item.id}>
                        <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                            {item.animal.rfid.codigoRFID}

                        </td>

                        <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                            {item.animal.peso}
                        </td>

                        <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                            {item.dataHora_FoiCome ? item.dataHora_FoiCome.split('T')[0] : "-"}
                        </td>

                        <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                            {item.dataHora_ParoCome ? item.dataHora_ParoCome.split('T')[0] : "-"}
                        </td>

                        <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                            {item.dataHora_FoiCome ? item.dataHora_FoiCome.split('T')[1].split('.')[0] : "-"}
                        </td>

                        <td className={arr.length == index + 1 ? "last-table-row" : "table-body-border"}>
                            {item.dataHora_ParoCome ? item.dataHora_ParoCome.split('T')[1].split('.')[0] : "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}