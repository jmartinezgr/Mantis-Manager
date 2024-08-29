from infrastructure.database.connection import Connection
import sqlite3
from datetime import datetime
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
    
    
    def create_ticket(self, title, description, reporter):
        # Crear un objeto Ticket
        new_ticket = Ticket(title, description, reporter)
        
        # Obtener la conexión y el cursor
        cursor = Connection.get_cursor()
        connection = Connection.get_connection()
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        


        try:
            # Insertar el ticket en la base de datos
            cursor.execute('''
            INSERT INTO tickets (estado, descripcion, id_creador, fecha_creacion, fecha_cierre)
            VALUES (?, ?, ?, ?, ?)
        ''', (new_ticket.status, new_ticket.description, new_ticket.reporter, now, None))
            
            # Obtener el ID del ticket recién creado
            new_ticket.id = cursor.lastrowid

            # Confirmar los cambios
            connection.commit()
            print("ticket creado y guardado")

            
            
            
        
        except sqlite3.Error as e:
            print(f"Error al crear el ticket: {e}")
    
    