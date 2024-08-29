# src/tickets/ticket_repository.py

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
