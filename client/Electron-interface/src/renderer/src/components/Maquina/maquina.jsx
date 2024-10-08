import React, { useState, useEffect } from 'react';

// Componente MachineList para mostrar y gestionar la lista de máquinas
const MachineList = () => {
  // Estado local para gestionar la lista de máquinas
  const [machines, setMachines] = useState([]);
  const [newMachine, setNewMachine] = useState({
    name: '',
    model: '',
    type: '',
    capacity: '',
    status: '',
    lastMaintenance: '',
    location: '',
    area: '',
    parts: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Efecto para cargar los datos de las máquinas desde un archivo JSON
  useEffect(() => {
    fetch('/data/maquinas.json')
      .then(response => response.json())
      .then(data => setMachines(data)) // Actualiza el estado con los datos obtenidos
      .catch(error => console.error('Error al cargar el JSON:', error)); // Maneja errores de carga
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Maneja los cambios en los campos del formulario para agregar una máquina nueva
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMachine(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Agrega una nueva máquina al estado
  const addMachine = () => {
    setMachines([...machines, newMachine]);
    setNewMachine({
      name: '',
      model: '',
      type: '',
      capacity: '',
      status: '',
      lastMaintenance: '',
      location: '',
      area: '',
      parts: [],
    });
    setIsModalOpen(false); // Cierra el modal después de agregar la máquina
  };

  // Elimina una máquina del estado
  const deleteMachine = (index) => {
    const updatedMachines = machines.filter((_, i) => i !== index);
    setMachines(updatedMachines);
  };

  // Edita el estado de una máquina (marcar/desmarcar como en mantenimiento)
  const toggleMachineStatus = (index) => {
    const updatedMachines = machines.map((machine, i) =>
      i === index
        ? { ...machine, status: machine.status === 'Mantenimiento' ? 'Operativa' : 'Mantenimiento' }
        : machine
    );
    setMachines(updatedMachines);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Título de la página */}
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">Inventario de Máquinas</h1>
      
      {/* Botón para abrir el modal y agregar una máquina */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-8 p-4 bg-indigo-600 text-white rounded"
      >
        Agregar Máquina
      </button>

      {/* Modal para agregar máquina */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Modal flotante */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
            <h2 className="text-2xl font-semibold mb-4">Agregar Nueva Máquina</h2>
            <form>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={newMachine.name}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Modelo"
                  value={newMachine.model}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Tipo"
                  value={newMachine.type}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="capacity"
                  placeholder="Capacidad"
                  value={newMachine.capacity}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="status"
                  placeholder="Estado"
                  value={newMachine.status}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="lastMaintenance"
                  placeholder="Último Mantenimiento"
                  value={newMachine.lastMaintenance}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Ubicación"
                  value={newMachine.location}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="area"
                  placeholder="Área"
                  value={newMachine.area}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={addMachine}
                  className="p-2 bg-indigo-600 text-white rounded mr-2"
                >
                  Guardar Máquina
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-red-600 text-white rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              
              {/* Botón para eliminar la máquina */}
              <button
                onClick={() => deleteMachine(index)}
                className="mt-4 p-2 bg-red-600 text-white rounded"
              >
                Eliminar Máquina
              </button>
              
              {/* Botón para alternar el estado de la máquina */}
              <button
                onClick={() => toggleMachineStatus(index)}
                className={`mt-4 ml-4 p-2 ${machine.status === 'Mantenimiento' ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded`}
              >
                {machine.status === 'Mantenimiento' ? 'Desmarcar Mantenimiento' : 'Marcar como en Mantenimiento'}
              </button>
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
                        <strong>{item.itemName}:</strong> {item.quantity}
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


