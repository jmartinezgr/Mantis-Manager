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
        Obtiene un ticket por ID desde la base de datos.

        :param ticket_id: ID del ticket a buscar.
        :return: Una lista con los datos del ticket si se encuentra, de lo contrario, None.
        """
        cursor = cls.get_cursor()

        try:
            cursor.execute('SELECT * FROM tickets WHERE id = ?', (ticket_id,))
            row = cursor.fetchone()

            if row:
                return Ticket(
                id=row[0],                # ID del ticket
                title=None,
                status=row[1],            # Estado del ticket
                description=row[2],       # Descripción del ticket
                reporter=row[3],          # ID del reportero
                assigned_to=row[4],       # ID del encargado (puede ser None)
                fecha_creacion=row[5],    # Fecha de creación
                fecha_cierre=row[6]       # Fecha de cierre (puede ser None)
            )
            else:
                return None  # Retornar None si no se encuentra el ticket

        except sqlite3.Error as e:
            print(f"Error al obtener el ticket: {e}")
            return None


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
        cursor = cls.get_cursor()
        connection = cls.get_connection()
        cursor.execute('DELETE FROM tickets WHERE id = ?', (ticket_id,))
        connection.commit()

        # Verificar si se eliminó algún registro
        if cursor.rowcount > 0:
            return True
        else:
            print(f"Ticket ID {ticket_id} no encontrado.")
            return False

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
    

    @classmethod
    def update_ticket(cls, ticket):
        cursor = cls.get_cursor()
        try:
            # Actualizamos todos los campos relevantes del ticket
            cursor.execute('''
                UPDATE tickets
                SET estado = ?, descripcion = ?, id_creador = ?, id_cierre_usuario = ?, fecha_creacion = ?, fecha_cierre = ?
                WHERE id = ?
            ''', (
                ticket.status,          # Estado del ticket
                ticket.description,     # Descripción del ticket
                ticket.reporter,        # ID del creador del ticket (reporter)
                ticket.assigned_to,     # ID del encargado (si aplica)
                ticket.fecha_creacion,  # Fecha de creación del ticket
                ticket.fecha_cierre,    # Fecha de cierre del ticket (si aplica)
                ticket.id               # ID del ticket a actualizar
            ))

            cls.connection.commit()

            if cursor.rowcount > 0:
                return True
            else:
                print(f"No se encontró el ticket con ID {ticket.id} para actualizar.")
                return False

        except sqlite3.Error as e:
            print(f"Error al actualizar el ticket: {e}")
            return False
