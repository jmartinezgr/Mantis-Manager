import React, { useState } from "react";
import './Tickets.css'; // Asegúrate de que aquí solo se mantengan los estilos que Tailwind no cubre.

const TicketCard = ({ ticket, onCancel, onEdit, tab }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState(ticket);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket({
      ...editedTicket,
      [name]: value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editedTicket);
    setIsEditing(false);
  };

  return (
    <div className={`ticket-card border-4 rounded-lg shadow-lg p-6 mb-4 transition-transform transform hover:scale-105`}
         style={{ borderColor: ticket.color }}>
      <h3 className="text-2xl font-bold text-gray-700 mb-4">Ticket {ticket.id}</h3>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción:
              <input
                type="text"
                name="description"
                value={editedTicket.description}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Persona que hace la petición:
              <input
                type="text"
                name="person"
                value={editedTicket.person}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prioridad:
              <select
                name="priority"
                value={editedTicket.priority}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
                <option value="N/A">N/A</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Máquina:
              <input
                type="text"
                name="machine"
                value={editedTicket.machine}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar edición
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="text-gray-600"><strong>Descripción:</strong> {ticket.description}</p>
          <p className="text-gray-600"><strong>Persona que hace la petición:</strong> {ticket.person}</p>
          <p className="text-gray-600"><strong>Prioridad:</strong> {ticket.priority}</p>
          <p className="text-gray-600"><strong>Máquina:</strong> {ticket.machine}</p>
          <div className="h-2 w-full rounded mt-4" style={{ backgroundColor: ticket.color }}></div>
          <div className="flex space-x-2 mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => onCancel(ticket.id, tab)}
            >
              Cancelar solicitud
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketCard;

