from gui.ticket_view import ticket_interface
from .user_management_view import login_menu

def main():
    usuario_logueado = None
    while True:
        if usuario_logueado is None or usuario_logueado is False:
            usuario_logueado = login_menu()
        
        if usuario_logueado:
            print("\n--- Menú Principal ---")
            print("1. Gestión de Tickets")
            print("2. Salir")
            
            choice = input("Seleccione una opción: ")
            if choice == '1':
                ticket_interface()
            elif choice == '2':
                print("Saliendo del sistema.")
                break
            else:
                print("Opción no válida. Intente nuevamente.")