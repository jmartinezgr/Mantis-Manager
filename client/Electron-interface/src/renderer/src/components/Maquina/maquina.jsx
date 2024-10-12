import React, { useState, useEffect } from 'react';
import MachineForm from './machineForm';
import MachineDetailsModal from './MachineModal';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null); // Para la máquina seleccionada
  const [isAddMachineModalOpen, setIsAddMachineModalOpen] = useState(false); // Modal para agregar máquina

  useEffect(() => {
    fetch('/data/maquinas.json')
      .then(response => response.json())
      .then(data => setMachines(data))
      .catch(error => console.error('Error al cargar el JSON:', error));
  }, []);

  const addMachine = (newMachine) => {
    setMachines([...machines, newMachine]);
    setIsAddMachineModalOpen(false);
  };

  const deleteMachine = (index) => {
    const updatedMachines = machines.filter((_, i) => i !== index);
    setMachines(updatedMachines);
  };

  const toggleMachineStatus = (index) => {
    const updatedMachines = machines.map((machine, i) =>
      i === index
        ? { ...machine, status: machine.status === 'Mantenimiento' ? 'Operativa' : 'Mantenimiento' }
        : machine
    );
    setMachines(updatedMachines);
  };

  const openDetailsModal = (machine) => {
    setSelectedMachine(machine);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedMachine(null); // Reinicia la máquina seleccionada al cerrar
  };

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
        onClick={() => setIsAddMachineModalOpen(true)}//pendiente ponerlo a la derecha
        className="mb-8 p-4 bg-indigo-600 text-white "
      >
        Agregar Máquina
      </button>
    </div>
  );
};

export default MachineList;

