import React, { useState } from 'react';

const MachineForm = ({ addMachine, closeModal }) => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [lastMaintenance, setLastMaintenance] = useState('');
  const [parts, setParts] = useState([{ partName: '', partDescription: '', inventory: [{ itemName: '', quantity: '' }] }]);

  const handleAddPart = () => {
    setParts([...parts, { partName: '', partDescription: '', inventory: [{ itemName: '', quantity: '' }] }]);
  };

  const handlePartChange = (index, key, value) => {
    const updatedParts = [...parts];
    updatedParts[index][key] = value;
    setParts(updatedParts);
  };

  const handleInventoryChange = (partIndex, itemIndex, key, value) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].inventory[itemIndex][key] = value;
    setParts(updatedParts);
  };

  const handleAddInventoryItem = (partIndex) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].inventory.push({ itemName: '', quantity: '' });
    setParts(updatedParts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMachine = {
      name,
      model,
      type,
      capacity,
      location,
      area,
      lastMaintenance,
      parts,
      status: 'Operativa', // Estado por defecto al agregar
    };
    addMachine(newMachine);
    // Reiniciar el formulario
    setName('');
    setModel('');
    setType('');
    setCapacity('');
    setLocation('');
    setArea('');
    setLastMaintenance('');
    setParts([{ partName: '', partDescription: '', inventory: [{ itemName: '', quantity: '' }] }]);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
        <h2 className="text-2xl font-semibold mb-4">Agregar Máquina</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Modelo</label>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Capacidad</label>
            <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ubicación</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Área</label>
            <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Último Mantenimiento</label>
            <input type="date" value={lastMaintenance} onChange={(e) => setLastMaintenance(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>

          <h3 className="text-lg font-semibold mt-4">Partes e Inventario:</h3>
          {parts.map((part, partIndex) => (
            <div key={partIndex} className="mb-4 border p-4 rounded">
              <div>
                <label className="block text-gray-700">Nombre de la Parte</label>
                <input
                  type="text"
                  value={part.partName}
                  onChange={(e) => handlePartChange(partIndex, 'partName', e.target.value)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mt-2">
                <label className="block text-gray-700">Descripción de la Parte</label>
                <textarea
                  value={part.partDescription}
                  onChange={(e) => handlePartChange(partIndex, 'partDescription', e.target.value)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <h4 className="font-semibold mt-2">Inventario:</h4>
              {part.inventory.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleInventoryChange(partIndex, itemIndex, 'itemName', e.target.value)}
                    placeholder="Nombre del ítem"
                    required
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleInventoryChange(partIndex, itemIndex, 'quantity', e.target.value)}
                    placeholder="Cantidad"
                    required
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddInventoryItem(partIndex)}
                className="mt-2 text-indigo-600"
              >
                Agregar ítem
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddPart} className="text-indigo-600">
            Agregar Parte
          </button>

          <div className="mt-4">
            <button type="submit" className="p-2 bg-indigo-600 text-white rounded">
              Agregar Máquina
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-2 p-2 bg-gray-400 text-white rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MachineForm;
