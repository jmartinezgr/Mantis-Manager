from infrastructure.database.connection import Connection
import sqlite3
from datetime import datetime
from tickets.ticket_entity import Ticket

class TicketRepository:
    # Variables de clase para la conexión y el cursor
    connection = Connection.get_connection()
    cursor = Connection.get_cursor()

    @classmethod
    def get_cursor(cls):
        return cls.cursor

    @classmethod
    def get_connection(cls):
        return cls.connection

    @classmethod
    def save_ticket(cls, ticket):
        """
        Guarda un ticket en un diccionario de tickets (para propósito de ejemplo).
        En una implementación real, podrías guardar en una base de datos.
        """
        # Aquí podrías implementar la lógica para guardar en un diccionario o base de datos
        pass

    @classmethod
    def get_ticket_by_id(cls, ticket_id):
        """
        Obtiene un ticket por ID desde un diccionario de tickets (para propósito de ejemplo).
        En una implementación real, podrías obtener desde una base de datos.
        """
        # Aquí podrías implementar la lógica para obtener un ticket desde un diccionario o base de datos
        pass

    @classmethod
    def print_all_tickets(cls):
        cursor = cls.get_cursor()
        connection = cls.get_connection()

        try:
            cursor.execute('''
                SELECT id, estado, descripcion, id_creador, id_cierre_usuario, fecha_creacion, fecha_cierre
                FROM tickets
            ''')
            tickets = cursor.fetchall()

            if not tickets:
                print("No hay tickets guardados.")
                return

            for ticket in tickets:
                ticket_id, estado, descripcion, id_creador, id_cierre_usuario, fecha_creacion, fecha_cierre = ticket

            print(f"Ticket ID: {ticket_id}")
            print(f"  Estado: {estado}")
            print(f"  Descripción: {descripcion}")
            print(f"  ID Creador: {id_creador}")
            print(f"  ID Cierre Usuario: {id_cierre_usuario if id_cierre_usuario else 'No asignado'}")
            print(f"  Fecha de Creación: {fecha_creacion}")
            print(f"  Fecha de Cierre: {fecha_cierre if fecha_cierre else 'No cerrado'}")
            print("-" * 40)

        except sqlite3.Error as e:
            print(f"Error al consultar los tickets: {e}")

    @classmethod
    def delete_ticket(cls, ticket_id):
        """
        Elimina un ticket del repositorio (para propósito de ejemplo).
        En una implementación real, podrías eliminar desde una base de datos.
        """
        # Aquí podrías implementar la lógica para eliminar desde un diccionario o base de datos
        pass

    @classmethod
    def create_ticket(cls, title, description, reporter):
        # Crear un objeto Ticket
        new_ticket = Ticket(title, description, reporter)
        
        # Obtener la conexión y el cursor
        cursor = cls.get_cursor()
        connection = cls.get_connection()
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
            print("Ticket creado y guardado")

        except sqlite3.Error as e:
            print(f"Error al crear el ticket: {e}")

    
   
    
    