import React from 'react';
import { HiCalendar, HiCheckCircle } from 'react-icons/hi';

const ListaMantenimiento = ({ listaMantenimiento, marcarComoCompletado }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Mantenimientos Programados</h2>
      {listaMantenimiento.length === 0 ? (
        <p className="text-gray-600 text-center">No hay mantenimientos programados.</p>
      ) : (
        <ul className="space-y-4">
          {listaMantenimiento.map((mantenimiento, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-lg shadow-sm border ${
                mantenimiento.completado ? 'bg-green-100' : 'bg-white'
              }`}
              onClick={() => marcarComoCompletado(index)}
            >
              <div>
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
              </div>
              {mantenimiento.completado ? (
                <HiCheckCircle size={28} className="text-green-500" />
              ) : (
                <HiCalendar size={28} className="text-blue-500" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaMantenimiento;
