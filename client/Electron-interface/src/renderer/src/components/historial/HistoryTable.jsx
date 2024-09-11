import React from 'react';
import { useTable } from 'react-table';
import "./TicketHistory.css"

const HistoryTable = ({ data, onClose }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'Fecha',
      accessor: 'date',
    },
    {
      Header: 'ID del Ticket',
      accessor: 'ticketId',
    },
    {
      Header: 'Acción',
      accessor: 'action',
    },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="history-modal">
      <div className="history-table">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>Historial de Tickets</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
