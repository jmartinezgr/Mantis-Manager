import React, { createContext, useState, useEffect } from 'react';
import { useApi } from '../hooks/apiHook';

export const MachineContext = createContext();

export const MachineProvider = ({ children }) => {
  const { fetchApi, loading, error } = useApi();
  const [machines, setMachines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isAddMachineModalOpen, setIsAddMachineModalOpen] = useState(false);

  // Mover getMachines fuera de useEffect para poder reutilizarla.
  const getMachines = async () => {
    const url = 'http://127.0.0.1:8000/machines/machines';
    try {
      const data = await fetchApi(url, 'GET');
      console.log(data);
      setMachines(data.machines || []); // Asegura que data.machines esté definida
    } catch (e) {
      console.error(error);
    }
  };

  // useEffect que ejecuta getMachines al montar el componente.
  useEffect(() => {
    getMachines(); // Llama a la función asíncrona
  }, [isAddMachineModalOpen]); // Asegúrate de agregar fetchApi como dependencia

  const addMachine = (newMachine) => {
    setMachines((prevMachines) => [...prevMachines, newMachine]);
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
    setMachines(updatedMachines); // Corrige para establecer los valores actualizados
  };

  const openDetailsModal = (machine) => {
    setSelectedMachine(machine);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedMachine(null);
  };

  return (
    <MachineContext.Provider
      value={{
        machines,
        addMachine,
        deleteMachine,
        toggleMachineStatus,
        openDetailsModal,
        closeDetailsModal,
        isModalOpen,
        selectedMachine,
        isAddMachineModalOpen,
        setIsAddMachineModalOpen,
        getMachines, // Añade getMachines al contexto para que pueda ser reutilizada
      }}
    >
      {children}
    </MachineContext.Provider>
  );
};

