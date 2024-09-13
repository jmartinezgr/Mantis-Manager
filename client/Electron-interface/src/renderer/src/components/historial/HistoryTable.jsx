import React from 'react';
import { useTable } from 'react-table';
import "./TicketHistory.css"

// Componente HistoryTable para mostrar un historial de tickets en una tabla
const HistoryTable = ({ data, onClose }) => {
  // Definición de las columnas de la tabla
  const columns = React.useMemo(() => [
    {
      Header: 'Fecha', // Encabezado de la columna para la fecha
      accessor: 'date', // Accede a la propiedad 'date' del objeto de datos
    },
    {
      Header: 'ID del Ticket', // Encabezado de la columna para el ID del ticket
      accessor: 'ticketId', // Accede a la propiedad 'ticketId' del objeto de datos
    },
    {
      Header: 'Acción', // Encabezado de la columna para la acción
      accessor: 'action', // Accede a la propiedad 'action' del objeto de datos
    },
  ], []);

  // Hook de react-table para manejar las propiedades y la estructura de la tabla funciona 
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      {/* Contenedor principal de la tabla con fondo blanco y estilo */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          {/* Título del modal */}
          <h2 className="text-2xl font-semibold text-gray-800">Historial de Tickets</h2>
          {/* Botón para cerrar el modal */}
          <button onClick={onClose} className="text-red-500 text-lg font-bold hover:text-red-600 transition">
            X
          </button>
        </div>
        {/* Contenedor para la tabla */}
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              {/* Encabezados de la tabla */}
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
              {/* Celdas de la tabla */}
              {rows.map(row => {
                prepareRow(row); // Prepara la fila para la renderización
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

