import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [ticketsData, setTicketsData] = useState({ "En cola": [], "En proceso": [], "Terminados": [] });
  const [showGenerarTickets, setShowGenerarTickets] = useState(false);
  const [history, setHistory] = useState([]);

  const recordHistory = (ticketId, action) => {
    const date = new Date().toLocaleDateString();
    setHistory(prevHistory => [...prevHistory, { date, ticketId, action }]);
  };

  const fetchTickets = async () => {
    const url= "http://127.0.0.1:8000/seguimiento"


    try {
      const response = await fetch(url,{
        method:"GET",
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`, // Reemplazar 'token' con el nombre de la variable de sesión que contiene el token
          "Content-Type": "application/json"

        }

      });
      if (response.ok){
        const data = await response.json();
        const pendientes= data.length>0?data.filter(data=>data.state=="pendiente"):[];

        // nueva forma de manejar el estado de los tickets 
        setTicketsData(previeTicket => ({
          ...previeTicket, // Copia todas las categorías anteriores
          "En cola": [...pendientes],
          "En proceso": [],
          "Terminados": [] 
            
        }));
        
        console.log(data)
        return data 
      }
     
     
     
     
      
    } catch (error) {
      console.error("Error al cargar los tickets:", error);
    }
  };
// esto es viejo
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
   * @param {Object} newTicket - Nuevo ticket a añadir con los campos: description, machine, priority.
   */
  const handleAddTicket = async (newTicket) => {
    // Datos del ticket para enviar a la API
    const ticketData = {
      description: newTicket.description,
      machine: newTicket.machine,
      priority: newTicket.priority,
    };

    try {
      const token = localStorage.getItem('access_token'); // Reemplaza 'token' con el nombre de la variable de sesión que contiene el token

      console.log(ticketData);
      const response = await fetch("http://127.0.0.1:8000/tickets", { // Reemplaza 'API_URL_HERE' con la URL de tu API
        method: "POST",
        headers: {
           Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          

        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        console.log(token);
      }

      const createdTicket = await response.json();
      const updatedData = { ...ticketsData };
      updatedData["En cola"].push(createdTicket);
      await updateTicketsData(updatedData);
      recordHistory(createdTicket.id, 'Creado');
    } catch (error) {
      console.error("Error al crear el ticket:", error);
    }
  };

  const handleCancel = async (ticketId, tab) => {
    const updatedData = { ...ticketsData };
    updatedData[tab] = updatedData[tab].filter(ticket => ticket.id !== ticketId);
    await updateTicketsData(updatedData);
    recordHistory(ticketId, 'Cancelado');
  };
//se requiere endpoint
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
const getAllTicket=()=>{

  const url = ""



}



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

export const useTicketContext = () => useContext(TicketContext);


