from tickets.ticket_service import TicketService

def update_ticket_status(ticket_repository, ticket_id, new_status, user):
    ticket_service = TicketService(ticket_repository)
    success = ticket_service.update_ticket_status(ticket_id, new_status, user)

    if not success:
        print(f"No se pudo actualizar el estado del ticket {ticket_id}.")
