from users.Creacion_Usuario import *
def create_user():
    user = User()
    user.set_name(input("Nombre: "))
    user.set_last_name(input("Apellido: "))
    user.set_email(input("Correo: "))
    user.set_password(input("Contraseña: "))
    user.set_role(input("Rol: "))
    user.set_id(input("ID: "))
    return userimport os
from rich.console import Console
from rich.prompt import Prompt
from rich.panel import Panel

from auth.auth_service import login

import time

console = Console()

def clear_screen():
    """Limpia la pantalla antes de mostrar la interfaz de login"""
    os.system('cls' if os.name == 'nt' else 'clear')

def login_menu():
    """Función que permite el login de un usuario"""
    clear_screen()

    # Mostrar un panel de bienvenida
    console.print(Panel.fit("[bold blue]Bienvenido a Mantis Manager[/bold blue]\n[italic white]Por favor, ingrese sus credenciales para continuar.[/italic white]"))

    username = Prompt.ask("[bold]Nombre de usuario[/bold]", console=console)
    password = Prompt.ask("[bold]Contraseña[/bold]", console=console)
    

    try_login = login(username, password)
    
    if try_login[0]:
        console.print("[bold green]Login exitoso[/bold green]")
        time.sleep(1.5)
        return True
    else:
        console.print(f"[bold red]{try_login[1]}[/bold red]")
        time.sleep(2)
        return False

if __name__ == "__main__":
    login_menu()