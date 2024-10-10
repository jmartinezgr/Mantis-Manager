import React, { useState } from 'react';
import { HiCalendar, HiOutlinePlusCircle, HiCheckCircle, HiClipboardList } from 'react-icons/hi';

const MaintenanceManagement = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [maintenanceDetails, setMaintenanceDetails] = useState({
    title: '',
    date: '',
    frequency: 'monthly',
    machine: '',
    completed: false, // nuevo estado para determinar si está completado
  });
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Estado para mostrar el modal con el historial

  const machines = ['Máquina 1', 'Máquina 2', 'Máquina 3', 'Máquina 4'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceDetails({ ...maintenanceDetails, [name]: value });
  };

  const addMaintenance = () => {
    if (maintenanceDetails.title && maintenanceDetails.date && maintenanceDetails.machine) {
      setMaintenanceList([...maintenanceList, maintenanceDetails]);
      setMaintenanceDetails({ title: '', date: '', frequency: 'monthly', machine: '', completed: false });
      setShowForm(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Función para marcar como completado
  const markAsCompleted = (index) => {
    const updatedList = maintenanceList.map((maintenance, idx) =>
      idx === index ? { ...maintenance, completed: !maintenance.completed } : maintenance
    );
    setMaintenanceList(updatedList);
  };

  // Función para abrir/cerrar el historial
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Filtrar los mantenimientos completados
  const completedMaintenances = maintenanceList.filter(maintenance => maintenance.completed);

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Gestión de Mantenimiento</h1>

      {/* Botones para añadir mantenimiento y ver historial */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={toggleForm}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <HiOutlinePlusCircle className="mr-2" size={24} />
          {showForm ? 'Cancelar' : 'Programar Mantenimiento'}
        </button>

        <button
          onClick={toggleHistory}
          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
        >
          <HiClipboardList className="mr-2" size={24} />
          Ver Historial
        </button>
      </div>

      {/* Formulario para añadir mantenimientos */}
      {showForm && (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mb-8 border">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Nuevo Mantenimiento</h2>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Máquina</label>
            <select
              name="machine"
              value={maintenanceDetails.machine}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Selecciona una máquina</option>
              {machines.map((machine, index) => (
                <option key={index} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Título del mantenimiento</label>
            <input
              type="text"
              name="title"
              value={maintenanceDetails.title}
              onChange={handleInputChange}
              placeholder="Ej. Revisión de motores"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Fecha inicial</label>
            <input
              type="date"
              name="date"
              value={maintenanceDetails.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Frecuencia</label>
            <select
              name="frequency"
              value={maintenanceDetails.frequency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="yearly">Anual</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              onClick={addMaintenance}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
            >
              Añadir Mantenimiento
            </button>
          </div>
        </div>
      )}

      {/* Lista de mantenimientos programados */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Mantenimientos Programados</h2>
        {maintenanceList.length === 0 ? (
          <p className="text-gray-600 text-center">No hay mantenimientos programados.</p>
        ) : (
          <ul className="space-y-4">
            {maintenanceList.map((maintenance, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-4 rounded-lg shadow-sm border ${
                  maintenance.completed ? 'bg-green-100' : 'bg-white'
                }`}
                onClick={() => markAsCompleted(index)} // Marcamos como completado al hacer clic
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{maintenance.title}</h3>
                  <p className="text-gray-600">
                    Fecha: <span className="font-semibold">{maintenance.date}</span>
                  </p>
                  <p className="text-gray-600">
                    Frecuencia: <span className="font-semibold">{maintenance.frequency}</span>
                  </p>
                  <p className="text-gray-600">
                    Máquina: <span className="font-semibold">{maintenance.machine}</span>
                  </p>
                </div>
                {maintenance.completed ? (
                  <HiCheckCircle size={28} className="text-green-500" />
                ) : (
                  <HiCalendar size={28} className="text-blue-500" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal para el historial */}
      {showHistory && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Historial de Mantenimientos Completados</h2>
            <button
              onClick={toggleHistory}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              Cerrar
            </button>
            {completedMaintenances.length === 0 ? (
              <p className="text-gray-600 text-center">No hay mantenimientos completados.</p>
            ) : (
              <ul className="space-y-4">
                {completedMaintenances.map((maintenance, index) => (
                  <li key={index} className="p-4 rounded-lg shadow-sm border bg-green-100">
                    <h3 className="text-lg font-bold text-gray-800">{maintenance.title}</h3>
                    <p className="text-gray-600">
                      Fecha: <span className="font-semibold">{maintenance.date}</span>
                    </p>
                    <p className="text-gray-600">
                      Frecuencia: <span className="font-semibold">{maintenance.frequency}</span>
                    </p>
                    <p className="text-gray-600">
                      Máquina: <span className="font-semibold">{maintenance.machine}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceManagement;
