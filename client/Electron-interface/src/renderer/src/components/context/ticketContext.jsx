// ticketContext.jsx
import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const TicketContext = createContext();

// Proveedor del contexto
export const TicketProvider = ({ children }) => {
  const [ticketsData, setTicketsData] = useState({ "En cola": [], "En proceso": [], "Terminados": [] });
  const [showGenerarTickets, setShowGenerarTickets] = useState(false);
  const [history, setHistory] = useState([]);

  const recordHistory = (ticketId, action) => {
    const date = new Date().toLocaleDateString();
    setHistory(prevHistory => [...prevHistory, { date, ticketId, action }]);
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch("/data/tickets.json");
      const data = await response.json();
      setTicketsData(data);
    } catch (error) {
      console.error("Error al cargar los tickets:", error);
    }
  };

  const updateTicketsData = async (updatedData) => {
    try {
      await fetch("/data/tickets.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });
      setTicketsData(updatedData);
    } catch (error) {
      console.error("Error al actualizar los tickets:", error);
    }
  };

  const handleAddTicket = async (newTicket) => {
    const updatedData = { ...ticketsData };
    updatedData["En cola"].push(newTicket);
    await updateTicketsData(updatedData);
    recordHistory(newTicket.id, 'Creado');
  };

  const handleCancel = async (ticketId, tab) => {
    const updatedData = { ...ticketsData };
    updatedData[tab] = updatedData[tab].filter(ticket => ticket.id !== ticketId);
    await updateTicketsData(updatedData);
    recordHistory(ticketId, 'Cancelado');
  };

  const handleEdit = async (editedTicket) => {
    const updatedData = { ...ticketsData };
    Object.keys(updatedData).forEach(tab => {
      updatedData[tab] = updatedData[tab].map(ticket =>
        ticket.id === editedTicket.id ? editedTicket : ticket
      );
    });
    await updateTicketsData(updatedData);
    recordHistory(editedTicket.id, 'Editado');
  };

  const toggleGenerarTickets = () => {
    setShowGenerarTickets(prev => !prev);
  };

  React.useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <TicketContext.Provider value={{
      ticketsData,
      handleAddTicket,
      handleCancel,
      handleEdit,
      showGenerarTickets,
      toggleGenerarTickets,
      history
    }}>
      {children}
    </TicketContext.Provider>
  );
};

// Hook para usar el contexto en componentes funcionales
export const useTicketContext = () => useContext(TicketContext);


