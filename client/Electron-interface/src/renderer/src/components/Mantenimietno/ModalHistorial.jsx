import React from 'react';

const ModalHistorialCompletados = ({ mantenimientosCompletados, alternarHistorial }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Historial de Mantenimientos Completados</h2>
        <button
          onClick={alternarHistorial}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          Cerrar
        </button>
        {mantenimientosCompletados.length === 0 ? (
          <p className="text-gray-600 text-center">No hay mantenimientos completados.</p>
        ) : (
          <ul className="space-y-4">
            {mantenimientosCompletados.map((mantenimiento, index) => (
              <li key={index} className="p-4 rounded-lg shadow-sm border bg-green-100">
                <h3 className="text-lg font-bold text-gray-800">{mantenimiento.titulo}</h3>
                <p className="text-gray-600">
                  Fecha: <span className="font-semibold">{mantenimiento.fecha}</span>
                </p>
                <p className="text-gray-600">
                  Frecuencia: <span className="font-semibold">{mantenimiento.frecuencia}</span>
                </p>
                <p className="text-gray-600">
                  Máquina: <span className="font-semibold">{mantenimiento.maquina}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalHistorialCompletados;
