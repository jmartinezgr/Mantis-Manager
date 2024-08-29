from tickets.ticket_service import TicketService
from  tickets.ticket_repository import TicketRepository as RP
def print_menu():
    print("\n--- Sistema de Tickets ---")
    print("1. Crear Ticket")
    print("2. Ver Ticket")
    print("3. Actualizar Estado del Ticket")
    print("4. Eliminar Ticket")
    print("5. Listar Tickets")
    print("6. Salir")

def create_ticket(service):
    titulo = input("titulo ")
    descripcion = input("descripción: ")
    reportero = input("reportero ") 
    ticket = service.create_ticket(titulo, descripcion, reportero)
    print(f"Ticket creado: {ticket}")

def view_ticket(service):
    ticket_id = int(input("ID del ticket a buscar: "))
    ticket = service.get_ticket(ticket_id)
    if ticket:
        print(ticket)
    else:
        print(f"Ticket con ID {ticket_id} no encontrado.")

def update_ticket(service):
    ticket_id = int(input("ID del ticket a actualizar: "))
    new_status = input("Nuevo estado (Pendiente, En Proceso, Completado): ")
    user= input("usuario que hace el cambio:")
    if service.update_ticket_status(ticket_id, new_status, user):
        print("Estado actualizado con éxito.")
    else:
        print("No se pudo actualizar el estado.")

def delete_ticket(service):
    ticket_id = int(input("ID del ticket a eliminar: "))
    if service.delete_ticket(ticket_id):
        print("Ticket eliminado con éxito.")
    else:
        print("No se pudo eliminar el ticket.")

def list_tickets(service):
    tickets = service.list_tickets()
    if tickets:
        for ticket in tickets:
            print(ticket)
    else:
        print("No hay tickets registrados.")

def ticket_interface():
    repository= RP()
    service = TicketService(repository)
    while True:
        print_menu()
        choice = input("Seleccione una opción: ")
        if choice == '1':
            create_ticket(service)
        elif choice == '2':
            view_ticket(service)
        elif choice == '3':
            update_ticket(service)
        elif choice == '4':
            delete_ticket(service)
        elif choice == '5':
            list_tickets(service)
        elif choice == '6':
            print("Saliendo del sistema.")
            break
        else:
            print("Opción no válida. Intente nuevamente.")