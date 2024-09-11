import React, { useState } from "react";
import { useTicketContext } from "../context/ticketContext";

const GenerarTickets = ({ CerrarHerramienta }) => {
  const [ticket, setTicket] = useState({
    title: "",        
    description: "",
    persona: "",
    date: "",
    prioridad: "",
    maquina: "",
  });

  const { handleAddTicket } = useTicketContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });
  };

  const generarTicket = () => {
    const newTicket = {
      id: Date.now(),
      title: ticket.title,        
      description: ticket.description,
      date: ticket.date,
      priority: ticket.prioridad,
      person: ticket.persona,       
      machine: ticket.maquina,      
      color: "#ffcc00",
    };

    handleAddTicket(newTicket);
    CerrarHerramienta();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="text-red-600 font-bold text-xl mb-4 focus:outline-none"
          onClick={CerrarHerramienta}
        >
          X
        </button>

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Generar Ticket</h1>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={ticket.title}
            onChange={handleInputChange}
            placeholder="Ingrese el título"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="persona" className="block text-sm font-medium text-gray-700">
            Persona que hace la petición:
          </label>
          <input
            type="text"
            id="persona"
            name="persona"
            value={ticket.persona}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={ticket.description}
            onChange={handleInputChange}
            placeholder="Descripción del problema"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div className="mb-4">
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
        </div>

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
