import React, { useState } from "react";
import './Tickets.css';

const TicketCard = ({ ticket, onCancel, onEdit }) => {
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
    <div className="ticket-card" style={{ borderColor: ticket.color }}>
      <h3>Ticket {ticket.id}</h3>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <label>
            Descripción:
            <input
              type="text"
              name="description"
              value={editedTicket.description}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Persona que hace la petición:
            <input
              type="text"
              name="person"
              value={editedTicket.person}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Prioridad:
            <select
              name="priority"
              value={editedTicket.priority}
              onChange={handleEditChange}
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
              <option value="N/A">N/A</option>
            </select>
          </label>
          <label>
            Máquina:
            <input
              type="text"
              name="machine"
              value={editedTicket.machine}
              onChange={handleEditChange}
            />
          </label>
          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar edición</button>
        </form>
      ) : (
        <>
          <p><strong>Descripción:</strong> {ticket.description}</p>
          <p><strong>Persona que hace la petición:</strong> {ticket.person}</p>
          <p><strong>Prioridad:</strong> {ticket.priority}</p>
          <p><strong>Máquina:</strong> {ticket.machine}</p>
          <div className="ticket-card" style={{ backgroundColor: ticket.color }}></div>
          <button className="cancel-button" onClick={() => onCancel(ticket.id)}>
            Cancelar solicitud
          </button>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Editar
          </button>
        </>
      )}
    </div>
  );
};

export default TicketCard;
