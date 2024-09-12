// ticketContext.jsx
import React, { createContext, useState, useContext } from "react";

// Crear el contexto
/**
 * Contexto para manejar el estado y funciones relacionadas con los tickets.
 * @type {React.Context}
 */
const TicketContext = createContext();

/**
 * Proveedor del contexto de tickets.
 * @param {Object} props - Props del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {React.ReactElement} - El proveedor del contexto.
 */
export const TicketProvider = ({ children }) => {
  // Estado para los datos de los tickets
  const [ticketsData, setTicketsData] = useState({ "En cola": [], "En proceso": [], "Terminados": [] });
  
  // Estado para mostrar u ocultar el formulario de generación de tickets
  const [showGenerarTickets, setShowGenerarTickets] = useState(false);
  
  // Estado para el historial de acciones sobre los tickets
  const [history, setHistory] = useState([]);

  /**
   * Registra una acción en el historial.
   * @param {string} ticketId - ID del ticket relacionado con la acción.
   * @param {string} action - Acción realizada (e.g., 'Creado', 'Cancelado', 'Editado').
   */
  const recordHistory = (ticketId, action) => {
    const date = new Date().toLocaleDateString();
    setHistory(prevHistory => [...prevHistory, { date, ticketId, action }]);
  };

  /**
   * Obtiene los datos de tickets desde un archivo JSON.
   * Actualiza el estado `ticketsData` con los datos obtenidos.
   */
  const fetchTickets = async () => {
    try {
      const response = await fetch("/data/tickets.json");
      const data = await response.json();
      setTicketsData(data);
    } catch (error) {
      console.error("Error al cargar los tickets:", error);
    }
  };

  /**
   * Actualiza los datos de tickets en el archivo JSON.
   * @param {Object} updatedData - Datos actualizados de los tickets.
   */
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

  /**
   * Maneja la adición de un nuevo ticket.
   * @param {Object} newTicket - Nuevo ticket a añadir.
   */
  const handleAddTicket = async (newTicket) => {
    const updatedData = { ...ticketsData };
    updatedData["En cola"].push(newTicket);
    await updateTicketsData(updatedData);
    recordHistory(newTicket.id, 'Creado');
  };

  /**
   * Maneja la cancelación de un ticket.
   * @param {string} ticketId - ID del ticket a cancelar.
   * @param {string} tab - Pestaña donde se encuentra el ticket ('En cola', 'En proceso', 'Terminados').
   */
  const handleCancel = async (ticketId, tab) => {
    const updatedData = { ...ticketsData };
    updatedData[tab] = updatedData[tab].filter(ticket => ticket.id !== ticketId);
    await updateTicketsData(updatedData);
    recordHistory(ticketId, 'Cancelado');
  };

  /**
   * Maneja la edición de un ticket.
   * @param {Object} editedTicket - Ticket editado.
   */
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

  /**
   * Alterna la visibilidad del formulario de generación de tickets.
   */
  const toggleGenerarTickets = () => {
    setShowGenerarTickets(prev => !prev);
  };

  // Carga los datos de tickets cuando el componente se monta
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

/**
 * Hook para usar el contexto de tickets en componentes funcionales.
 * @returns {Object} - El valor del contexto que incluye el estado y las funciones.
 */
export const useTicketContext = () => useContext(TicketContext);


