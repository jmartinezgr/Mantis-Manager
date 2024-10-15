import React from 'react';

const FormularioMantenimiento = ({ detallesMantenimiento, manejarCambioInput, agregarMantenimiento, maquinas }) => {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mb-8 border">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Nuevo Mantenimiento</h2>
      {/* Formulario para seleccionar máquina, título, fecha y frecuencia */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Máquina</label>
        <select
          name="maquina"
          value={detallesMantenimiento.maquina}
          onChange={manejarCambioInput}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Selecciona una máquina</option>
          {maquinas.map((maquina, index) => (
            <option key={index} value={maquina}>
              {maquina}
            </option>
          ))}
        </select>
      </div>
      {/* ... resto de campos de formulario ... */}
      <div className="flex justify-end">
        <button
          onClick={agregarMantenimiento}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
        >
          Añadir Mantenimiento
        </button>
      </div>
    </div>
  );
};

export default FormularioMantenimiento;
