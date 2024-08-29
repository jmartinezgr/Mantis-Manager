"""Este modulo contiene funciones que permiten la autenticacion de usuarios aplicando logica de negocio"""

import os
from rich.console import Console
from rich.prompt import Prompt
from rich.panel import Panel
import auth_repository

console = Console()

def clear_screen():
    """Limpia la pantalla antes de mostrar la interfaz de login"""
    os.system('cls' if os.name == 'nt' else 'clear')

def login():
    """Función que permite el login de un usuario"""
    clear_screen()

    # Mostrar un panel de bienvenida
    console.print(Panel.fit("[bold blue]Bienvenido a Mantis Manager[/bold blue]\n[italic white]Por favor, ingrese sus credenciales para continuar.[/italic white]"))

    username = Prompt.ask("[bold]Nombre de usuario[/bold]", console=console)
    password = Prompt.ask("[bold]Contraseña[/bold]", console=console, password=True)

    # Aquí llamamos al repositorio de autenticación para verificar el usuario
    if auth_repository.AuthRepository().verify_user(username, password):
        console.print("[bold green]Login exitoso[/bold green]")
    else:
        console.print("[bold red]Nombre de usuario o contraseña incorrectos[/bold red]")

if __name__ == "__main__":
    login()