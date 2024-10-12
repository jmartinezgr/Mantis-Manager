import React, { createContext, useState, useEffect } from 'react';
import {useApi} from '../hooks/apiHook';

export const MachineContext = createContext();

export const MachineProvider = ({ children }) => {
  const {fetchApi , loading, error}=useApi();
  const [machines, setMachines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isAddMachineModalOpen, setIsAddMachineModalOpen] = useState(false);


  useEffect(() => {
    const getMachines = async () => { // Cambia a una función asíncrona
      const url = 'http://127.0.0.1:8000/machines';
      try {
        const data = await fetchApi(url, 'GET'); // Espera a que fetchApi complete
        console.log(data);
        setMachines(data.machines || []); // Asegúrate de que se maneje el caso en que `machines` no esté definido
  
      } catch (e) {
        console.log(data)
       
        console.log(error);
      }
    };
  
    getMachines(); // Llama a la función asíncrona
  }, []); // Agrega `fetchApi` como dependencia si es necesario
  

  const addMachine = (newMachine) => {
    setMachines((prevMachines) => [...prevMachines, newMachine]); // Agrega la nueva máquina a la lista existente
    setIsAddMachineModalOpen(false); // Cierra el modal después de agregar
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
    setMachines([]);
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
    <MachineContext.Provider value={{
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
    }}>
      {children}
    </MachineContext.Provider>
  );
};
