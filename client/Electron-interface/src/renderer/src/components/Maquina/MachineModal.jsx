import React from 'react';

const MachineDetailsModal = ({ machine, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
        <h2 className="text-2xl font-semibold mb-4">{machine.brand}</h2>
        <p><strong>Tipo:</strong> {machine.type}</p>
        <p><strong>Serial:</strong> {machine.serial}</p>
        <p><strong>Acción:</strong> {machine.action}</p>

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

