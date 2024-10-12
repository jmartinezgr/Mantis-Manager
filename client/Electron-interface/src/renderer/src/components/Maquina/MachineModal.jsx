import React from 'react';

const MachineDetailsModal = ({ machine, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
        <h2 className="text-2xl font-semibold mb-4">{machine.name}</h2>
        <p><strong>Modelo:</strong> {machine.model}</p>
        <p><strong>Tipo:</strong> {machine.type}</p>
        <p><strong>Capacidad:</strong> {machine.capacity}</p>
        <p><strong>Estado:</strong> {machine.status}</p>
        <p><strong>Último Mantenimiento:</strong> {machine.lastMaintenance}</p>
        <p><strong>Ubicación:</strong> {machine.location}</p>
        <p><strong>Área:</strong> {machine.area}</p>

        <h3 className="text-lg font-semibold mt-4">Partes e Inventario:</h3>
        {machine.parts.map((part, partIndex) => (
          <div key={partIndex} className="mb-2">
            <h4 className="font-semibold">{part.partName}</h4>
            <p>{part.partDescription}</p>
            <ul className="list-disc list-inside">
              {part.inventory.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <strong>{item.itemName}:</strong> {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={closeModal}
          className="mt-4 p-2 bg-gray-400 text-white rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default MachineDetailsModal;
