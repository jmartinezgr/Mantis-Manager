import React, { useState, useEffect } from 'react';

const MachineList = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    fetch('/data/maquinas.json')
      .then(response => response.json())
      .then(data => setMachines(data))
      .catch(error => console.error('Error al cargar el JSON:', error));
  }, []);

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">Inventario de Máquinas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {machines.map((machine, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{machine.name}</h2>
              <p className="text-gray-700"><span className="font-bold">Modelo:</span> {machine.model}</p>
              <p className="text-gray-700"><span className="font-bold">Tipo:</span> {machine.type}</p>
              <p className="text-gray-700"><span className="font-bold">Capacidad:</span> {machine.capacity}</p>
              <p className="text-gray-700"><span className="font-bold">Estado:</span> {machine.status}</p>
            </div>
            <div className="bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Partes y Inventario:</h3>
              {machine.parts.map((part, partIndex) => (
                <div key={partIndex} className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800">{part.partName}</h4>
                  <p className="text-gray-600 mb-2">{part.partDescription}</p>
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
