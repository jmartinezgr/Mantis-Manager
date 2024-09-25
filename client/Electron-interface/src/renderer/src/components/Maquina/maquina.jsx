import React, { useState, useEffect } from 'react';

// Componente MachineList para mostrar una lista de máquinas
const MachineList = () => {
  // Estado local para gestionar la lista de máquinas
  const [machines, setMachines] = useState([]);

  // Efecto para cargar los datos de las máquinas desde un archivo JSON
  useEffect(() => {
    fetch('/data/maquinas.json')
      .then(response => response.json())
      .then(data => setMachines(data)) // Actualiza el estado con los datos obtenidos
      .catch(error => console.error('Error al cargar el JSON:', error)); // Maneja errores de carga
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Título de la página */}
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">Inventario de Máquinas</h1>
      
      {/* Contenedor de las tarjetas de las máquinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Itera sobre cada máquina y genera una tarjeta para cada una */}
        {machines.map((machine, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* Contenedor de información principal de la máquina */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{machine.name}</h2>
              <p className="text-gray-700"><span className="font-bold">Modelo:</span> {machine.model}</p>
              <p className="text-gray-700"><span className="font-bold">Tipo:</span> {machine.type}</p>
              <p className="text-gray-700"><span className="font-bold">Capacidad:</span> {machine.capacity}</p>
              <p className="text-gray-700"><span className="font-bold">Estado:</span> {machine.status}</p>
              <p className="text-gray-700"><span className="font-bold">Último Mantenimiento:</span> {machine.lastMaintenance}</p>
              <p className="text-gray-700"><span className="font-bold">Ubicación:</span> {machine.location}</p>
              <p className="text-gray-700"><span className="font-bold">Área:</span> {machine.area}</p>
            </div>
            {/* Contenedor de partes e inventario de la máquina */}
            <div className="bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Partes y Inventario:</h3>
              {/* Itera sobre cada parte de la máquina */}
              {machine.parts.map((part, partIndex) => (
                <div key={partIndex} className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800">{part.partName}</h4>
                  <p className="text-gray-600 mb-2">{part.partDescription}</p>
                  {/* Lista del inventario de la parte */}
                  <ul className="list-disc list-inside text-gray-600">
                    {part.inventory.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <strong>{item.itemName}:</strong> {item.quantity} en {item.location}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineList;


