from gui.ticket_view import ticket_interface
from gui.user_management_view import create_user
from .user_management_view import login_menu
from .create_user_view import create_user_interface

def main():
    usuario_logueado = None
    while True:
        print("\n--- Menú Principal ---")
        print("1. Gestión de Tickets")
        print("2. Salir")
        
        choice = input("Seleccione una opción: ")
        if choice == '1':
            ticket_interface()
        elif choice == '2':
            user_interface()
        elif choice == '2':
            print("Saliendo del sistema.")
            break
        else:
            print("Opción no válida. Intente nuevamente.")