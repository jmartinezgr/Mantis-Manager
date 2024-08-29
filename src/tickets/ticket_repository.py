from tickets.ticket_entity import Ticket
class TicketRepository:
    def __init__(self):
        self.tickets = {}

    def save_ticket(self, ticket):
        self.tickets[ticket["ticket_id"]] = ticket

    def get_ticket_by_id(self, ticket_id):
        return self.tickets.get(ticket_id)

    def print_all_tickets(self):
        if not self.tickets:
            print("No hay tickets guardados.")
            return

        for ticket_id, ticket in self.tickets.items():
            print(f"Ticket ID: {id}")
            #print(f"  Máquina: {ticket['machine']}")
            print(f"  Problema: {ticket['title']}")
            print(f"  Descripcion: {ticket['description']}")
            print(f"  Asignado a: {ticket['assigned_to']}")
            print(f"  Reportado por: {ticket['reporter']}")
            print(f"  Estado: {ticket['estatus']}")
            #print("  Historial de Estados:")
            #for status, timestamp in ticket['status_history']:
            #    print(f"    - {status} (cambiado en {timestamp})")
            print("-" * 40)
    def delete_ticket(self, ticket_id):
        """
        Elimina un ticket del repositorio.

        :param ticket_id: ID del ticket a eliminar.
        :return: True si el ticket se eliminó, False si no se encontró.
        """
        if ticket_id in self.tickets:
            del self.tickets[ticket_id]
            print(f"Ticket ID {ticket_id} eliminado.")
            return True
        print(f"Ticket ID {ticket_id} no encontrado.")
        return False
    
    
    def create_ticket(self, title,description,reporter):
        new_ticket=Ticket(title, description, reporter)
        ticket_id = new_ticket.id
        
        # Crear un diccionario con la información del ticket
        ticket_data = {
            "ticket_id": ticket_id,
            "title": new_ticket.title,
            "description": new_ticket.description,
            "assigned_to": getattr(new_ticket, 'assigned_to', None),  # Asignado a (si existe)
            "reporter": new_ticket.reporter,
            "estatus": new_ticket.status
        }
        
        # Guardar el ticket en el diccionario de tickets
        self.tickets[ticket_id] = ticket_data
        
        print(f"Ticket ID {ticket_id} creado con éxito.")
        
    
    