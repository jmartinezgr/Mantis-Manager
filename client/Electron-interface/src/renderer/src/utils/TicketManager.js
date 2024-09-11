// src/utils/TicketManager.js
export default class TicketManager {
    constructor(ticketsData) {
      this.ticketsData = ticketsData;
    }
  
    // Obtener los tickets por su estado
    getTicketsByTab(tab) {
      return this.ticketsData[tab] || [];
    }
  
    // Eliminar un ticket
    removeTicket(ticketId, tab) {
      this.ticketsData[tab] = this.ticketsData[tab].filter(ticket => ticket.id !== ticketId);
      return this.ticketsData;
    }
  
    // Agregar un nuevo ticket
    addTicket(newTicket) {
      this.ticketsData["En cola"].push(newTicket);
      return this.ticketsData;
    }
  
    // Editar un ticket
    editTicket(editedTicket) {
      Object.keys(this.ticketsData).forEach((tab) => {
        this.ticketsData[tab] = this.ticketsData[tab].map(ticket =>
          ticket.id === editedTicket.id ? editedTicket : ticket
        );
      });
      return this.ticketsData;
    }
  }
  