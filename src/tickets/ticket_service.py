# src/tickets/ticket_service.py

#from datetime import datetime
from tickets.ticket_repository import TicketRepository

class TicketService:
    def __init__(self, ticket_repository):
        self.ticket_repository = ticket_repository

    
    def update_ticket_status(self, id, nuevo_estado, user):
        ticket = self.ticket_repository.get_ticket_by_id(id) #Buscar el id del tiquet en el repositorio
        
        if ticket:
            if nuevo_estado in ["Nuevo", "Asignado", "En proceso", "En espera", "Escalado", "Resuelto", "Cancelado"]:
                if user.rol in ["Administrador", "Mantenimiento"] and (user.username == ticket["assigned_to"] or user.rol == "Administrador"):
                    ticket["estatus"] = nuevo_estado
                    #ticket["status_history"].append((nuevo_estado, datetime.now()))
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
    



