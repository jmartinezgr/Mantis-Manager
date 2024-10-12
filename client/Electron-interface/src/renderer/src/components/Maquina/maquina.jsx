import React, { useContext } from 'react';
import { MachineContext } from '../context/MachineContext';
import MachineForm from './machineForm';
import MachineDetailsModal from './MachineModal';

const MachineList = () => {
  const {
    machines,
    addMachine,
    deleteMachine,
    toggleMachineStatus,
    openDetailsModal,
    closeDetailsModal,
    isModalOpen,
    selectedMachine,
    isAddMachineModalOpen,
    setIsAddMachineModalOpen
  } = useContext(MachineContext);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">Inventario de Máquinas</h1>

      {/* Modal para agregar máquina */}
      {isAddMachineModalOpen && (
        <MachineForm addMachine={addMachine} closeModal={() => setIsAddMachineModalOpen(false)} />
      )}

      {/* Tabla de máquinas */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Modelo</th>
            <th className="py-3 px-4">Tipo</th>
            <th className="py-3 px-4">Estado</th>
            <th className="py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine, index) => (
            
            <tr key={index} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => openDetailsModal(machine)}>

              <td className="py-3 pr-6 pl-10">{machine.name}</td>
              <td className="py-3 px-6">{machine.model}</td>
              <td className="py-3 pl-6">{machine.type}</td>
              <td className="py-3 px-4">{machine.status}</td>
              <td className="py-3 px-4">
                <button onClick={(e) => { e.stopPropagation(); deleteMachine(index); }} className="text-white bg-red-500 rounded-lg p-2 gap-4">
                  Eliminar
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleMachineStatus(index); }} className={`ml-2 bg-blue-500 rounded-lg p-2 text-white ${machine.status === 'Mantenimiento' ? 'text-green-600' : 'text-yellow-900'}`}>
                  {machine.status === 'Mantenimiento' ? 'Desmarcar' : 'Marcar como en Mantenimiento'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para ver detalles de la máquina */}
      {isModalOpen && selectedMachine && (
        <MachineDetailsModal machine={selectedMachine} closeModal={closeDetailsModal} />
      )}
      
      <button
        onClick={() => setIsAddMachineModalOpen(true)}
        className="mb-8 p-4 bg-indigo-600 text-white"
      >
        Agregar Máquina
      </button>
    </div>
  );
};

export default MachineList;


