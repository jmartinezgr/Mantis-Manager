import React, { useState } from "react";
import { useTicketContext } from "../context/ticketContext";
import './Tools.css';

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
    <div className="ticket-container">
      <div className="ticket-form">
        <button className="close-btn" onClick={CerrarHerramienta}>
          X
        </button>

        <h1 className="ticket-title">Generar Ticket</h1>

        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={ticket.title}
          onChange={handleInputChange}
          placeholder="Ingrese el título"
        />

        <label htmlFor="maquina">Máquina</label>
        <input
          type="text"
          id="maquina"
          name="maquina"
          value={ticket.maquina}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre de la máquina"
        />

        <label htmlFor="persona">Persona que hace la petición:</label>
        <input
          type="text"
          id="persona"
          name="persona"
          value={ticket.persona}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre"
        />

        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={ticket.description}
          onChange={handleInputChange}
          placeholder="Descripción del problema"
        />

        <label htmlFor="prioridad">Prioridad:</label>
        <select
          id="prioridad"
          name="prioridad"
          value={ticket.prioridad}     
          onChange={handleInputChange}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>

        <label htmlFor="date">Fecha:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={ticket.date}
          onChange={handleInputChange}
        />

        <button onClick={generarTicket} className="btn-generate">
          Generar Ticket
        </button>
      </div>
    </div>
  );
};

export default GenerarTickets;
