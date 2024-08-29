# src/main.py

from tickets.ticket_repository import TicketRepository
from tickets.update_ticket_status import update_ticket_status

repositorio = TicketRepository()

# esto es solo pa probar...
class User:
    def __init__(self, username, rol):
        self.username = username
        self.rol = rol


# ticket pa probar
ticket1 = {
    "ticket_id": 1,
    "title": "Máquina no arranca",
    "description": "La máquina 3 ausilio.",
    "assigned_to": "juan jose del rosario",
    "reporter": "david silva",
    "estatus": "Nuevo"
}
repositorio.save_ticket(ticket1)
user = User("juan jose del rosario", "Mantenimiento")


repositorio.print_all_tickets()
print("\n")
update_ticket_status(repositorio, 1, "En proceso", user)
print("\n")
repositorio.print_all_tickets()

"""
# pruebo con un estado que no existe
update_ticket_status(repositorio, 1, "Cerrado", user)

# pruebo con usuario sin permisos
user_sin_permisos = User("operario_pedro", "Operario")
update_ticket_status(repositorio, 1, "Resuelto", user_sin_permisos)
"""