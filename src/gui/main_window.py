from gui.ticket_view import ticket_interface



def main():
    while True:
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