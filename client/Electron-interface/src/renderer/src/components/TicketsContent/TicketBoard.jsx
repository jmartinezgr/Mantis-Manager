import React, { useState } from "react";
import TicketCard from "./Tarjeta";
import { useTicketContext } from "../context/ticketContext";
import './Tickets.css';

const TicketBoard = () => {
  const [selectedTab, setSelectedTab] = useState("En cola");
  const { ticketsData, handleCancel, handleEdit } = useTicketContext();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="ticket-board">
      <div className="tabs">
        <button className={selectedTab === "En cola" ? "active" : ""} onClick={() => handleTabClick("En cola")}>En cola</button>
        <button className={selectedTab === "En proceso" ? "active" : ""} onClick={() => handleTabClick("En proceso")}>En proceso</button>
        <button className={selectedTab === "Terminados" ? "active" : ""} onClick={() => handleTabClick("Terminados")}>Terminados</button>
      </div>

      <div className="ticket-list">
        {ticketsData[selectedTab] && ticketsData[selectedTab].map(ticket => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onCancel={handleCancel}
            onEdit={handleEdit}
            tab={selectedTab}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketBoard;
