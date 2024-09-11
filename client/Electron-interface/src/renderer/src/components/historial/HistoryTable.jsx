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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Historial de Tickets</h2>
          <button onClick={onClose} className="text-red-500 text-lg font-bold hover:text-red-600 transition">
            X
          </button>
        </div>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-100 transition-colors">
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;

