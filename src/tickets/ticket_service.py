#from datetime import datetime
from tickets.ticket_repository import TicketRepository as TKR
from tickets.ticket_entity import Ticket

class TicketService:
    def __init__(self, ticket_repository):
        self.ticket_repository = ticket_repository
    
    def create_ticket(self,titulo, description,reporter ):
        TKR.create_ticket(titulo, description,reporter)
        
    
    def update_ticket_status(self, id, nuevo_estado, user):
        ticket = TKR.get_ticket_by_id(id)
        if ticket:
            if nuevo_estado in ["Pendiente", "En Proceso", "Completado"]:
                ticket.status = nuevo_estado
                TKR.update_ticket(ticket)
                print(f"Ticket {id} ha cambiado de estado exitosamente.")
                return True
            else:
                print("Error: Estado no válido.")
        else:
            print(f"Error: Ticket {id} no encontrado.")
        return False
    
    """
    def update_ticket_status(self, id, nuevo_estado, user):
        ticket = TKR.get_ticket_by_id(id) 
        
        if ticket:
            if user.rol in ["Administrador", "Mantenimiento"] and (user.username == ticket["assigned_to"] or user.rol == "Administrador"):  aun no hay usuarios
  
                    ticket.estatus = nuevo_estado
                    ticket["status_history"].append((nuevo_estado, datetime.now()))
                    self.ticket_repository.save_ticket(ticket)
                    print(f"Ticket {id} ha cambiado de estado exitosamente.")
                    return True
                else:
                    print("Error: El usuario no tiene permisos para cambiar el estado del ticket.")
                
            else:
                print("Error: Estado no válido.")
        else:
            print(f"Error: Ticket {id} no encontrado.")
        return False
    """

    def get_ticket(self, ticket_id):
        """
        Obtiene un ticket por su ID.

        :param ticket_id: ID del ticket a buscar.
        :return: El objeto Ticket si se encuentra, de lo contrario, None.
        """
        ticket = TKR.get_ticket_by_id(ticket_id)
        return ticket
    
    def delete_ticket(self, ticket_id):
        """
        Elimina un ticket del repositorio.

        :param ticket_id: ID del ticket a eliminar.
        :return: True si el ticket se eliminó, False si no se encontró.
        """
        return TKR.delete_ticket(ticket_id)

    def list_tickets(self):
        """
        Muestra todos los tickets en el repositorio.

        :return: Una lista de todos los objetos Ticket.
        """
        return TKR.print_all_tickets()
   
    
    



