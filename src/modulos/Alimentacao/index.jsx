import {importaDadosAlimentacao} from './controllers/alimentacaoController.js'

import { Fragment, useEffect, useState, useMemo } from 'react';

import Table from '../../components/Table/index';

export default function AlimentacaoContainer() {
    const [data, setData] = useState({});

    useEffect(() => {
        const dadosAlimentacao = importaDadosAlimentacao();
        setData(dadosAlimentacao);
    }, [])
 
    return (
      <div>
        <Table/>
      </div>

    )
}