import React, { useState } from "react";
import TicketCard from "./Tarjeta";
import './Tickets.css';

const TicketBoard = () => {
  const [selectedTab, setSelectedTab] = useState("En cola");

  const [ticketsData, setTicketsData] = useState({
    "En cola": [
      { id: 1, description: "Máquina presenta fallos en cadenas", priority: "Alta", person: "Juan Pérez", machine: "Máquina 1", color: "#00a2ff" },
      { id: 2, description: "Máquina presenta fallos en urdidoras", priority: "Media", person: "Ana Rodríguez", machine: "Máquina 2", color: "#ff4d4d" }
    ],
    "En proceso": [
      { id: 3, description: "Máquina presenta fallos en motor", priority: "Baja", person: "Carlos Sánchez", machine: "Máquina 3", color: "#c7e600" }
    ],
    "Terminados": [
      { id: 4, description: "Reparación completada", priority: "N/A", person: "Equipo de mantenimiento", machine: "Máquina 1", color: "#4caf50" }
    ]
  });

  // Función para manejar la cancelación de un ticket
  const handleCancel = (ticketId) => {
    const updatedTickets = ticketsData[selectedTab].filter(ticket => ticket.id !== ticketId);
    setTicketsData({
      ...ticketsData,
      [selectedTab]: updatedTickets
    });
  };

  // Función para manejar la edición de un ticket
  const handleEdit = (editedTicket) => {
    const updatedData = { ...ticketsData };
    Object.keys(updatedData).forEach((tab) => {
      updatedData[tab] = updatedData[tab].map(ticket =>
        ticket.id === editedTicket.id ? editedTicket : ticket
      );
    });
    setTicketsData(updatedData);
  };

  // Cambia la pestaña seleccionada
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="ticket-board">
      {/* Pestañas */}
      <div className="tabs">
        <button className={selectedTab === "En cola" ? "active" : ""} onClick={() => handleTabClick("En cola")}>En cola</button>
        <button className={selectedTab === "En proceso" ? "active" : ""} onClick={() => handleTabClick("En proceso")}>En proceso</button>
        <button className={selectedTab === "Terminados" ? "active" : ""} onClick={() => handleTabClick("Terminados")}>Terminados</button>
      </div>

      {/* Renderizar las tarjetas de tickets según la pestaña seleccionada */}
      <div className="ticket-list">
        {ticketsData[selectedTab].map(ticket => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onCancel={handleCancel}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketBoard;
