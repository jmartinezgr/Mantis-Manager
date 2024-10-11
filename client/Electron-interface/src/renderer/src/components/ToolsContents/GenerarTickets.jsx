import React, { useState } from "react";
import { useTicketContext } from "../context/ticketContext";

// Componente GenerarTickets para crear un nuevo ticket
const GenerarTickets = ({ CerrarHerramienta }) => {
  // Estado local para gestionar los datos del nuevo ticket
  const [ticket, setTicket] = useState({
    title: "",        
    description: "",
    persona: "",
    date: "",
    prioridad: "",
    maquina: "",
  });

  // Obtiene la función para agregar un ticket desde el contexto
  const {  handleAddTicket } = useTicketContext(); // Asegúrate de que este método exista en tu contexto

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  // Genera un nuevo ticket y lo envía al contexto
  const generarTicket = () => {
    const newTicket = {
         
      description: ticket.description,
      priority: ticket.prioridad,       
      machine: ticket.maquina,      
      // Color predeterminado para el ticket
    };

    handleAddTicket(newTicket); // Agrega el nuevo ticket usando la función del contexto
    CerrarHerramienta(); // Cierra el formulario después de generar el ticket
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Contenedor del formulario de generación de tickets */}
      <div className="bg-white pl-6 pr-6 pt-3 pb-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Botón para cerrar el formulario */}
        <div className="flex justify-end">
          <button
            className="text-red-600 font-bold text-xl mb-4 focus:outline-none"
            onClick={CerrarHerramienta}
          >
            X
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Generar Ticket</h1>

        {/* Campo para el título del ticket */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={ticket.description}
            onChange={handleInputChange}
            placeholder="Ingrese la descripción"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Campo para la máquina asociada al ticket */}
        <div className="mb-4">
          <label htmlFor="maquina" className="block text-sm font-medium text-gray-700">
            Máquina:
          </label>
          <input
            type="text"
            id="maquina"
            name="maquina"
            value={ticket.maquina}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre de la máquina"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        

        {/* Campo para la prioridad del ticket */}
        <div className="mb-4">
          <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">
            Prioridad:
          </label>
          <select
            id="prioridad"
            name="prioridad"
            value={ticket.prioridad}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        {/* Campo para la fecha del ticket */}
        {/*<div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Fecha:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={ticket.date}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>*/}

        {/* Botón para generar el ticket */}
        <button
          onClick={generarTicket}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Generar Ticket
        </button>
      </div>
    </div>
  );
};

export default GenerarTickets;
