import {importaDadosAlimentacao} from './controllers/alimentacaoController.js'
// import * as useTable from 'useTable';
import { Fragment, useEffect, useState, useMemo } from 'react';

import { useTable } from 'react-table';

export default function AlimentacaoContainer() {
    // const [data, setData] = useState({});

    // useEffect(() => {
    //     const dadosAlimentacao = importaDadosAlimentacao();
    //     setData(dadosAlimentacao);
    //     debugger;
    // }, [])

    const data = useMemo(
        () => [
            //cada um eh uma linha
          { 
            col1: 'Hello',
            col2: 'World',
          },
          {
            col1: 'react-table',
            col2: 'rocks',
          },
          {
            col1: 'whatever',
            col2: 'you want',
          },
        ],
        []
    )

      const columns = useMemo(
        () => [
            //cada um eh uma coluna, Header eh o que aparece em cada cabeçalho
          {
            Header: 'Column 1',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Column 2',
            accessor: 'col2',
          },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
 
    return (
        // apply the table props 
        <table {...getTableProps()}>
            <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                        {// Render the header
                        column.render('Header')}
                    </th> 
                    ))}
                </tr>
                ))}
            </thead>

            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                        // Apply the cell props
                        return (
                        <td {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    )
}