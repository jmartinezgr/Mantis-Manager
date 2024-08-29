"""Este modulo contiene funciones que permiten la autenticacion de usuarios aplicando logica de negocio"""

from .auth_repository import Auth_Repository

def login(username: str, password: str):
    """Función que permite el login de un usuario"""
    
    auth_repo = Auth_Repository()  # Crear instancia de Auth_Repository
    response = auth_repo.verify_user(username, password)  # Llamar al método con la instancia

    # Aquí llamamos al repositorio de autenticación para verificar el usuario
    if response["error"] is None:
        return (True, "Login exitoso")
    else:
        if response["error"] == "Usuario no encontrado":
            return (False, "Usuario no encontrado")
        else:
            return (False, "Contraseña incorrecta")

if __name__ == "__main__":
    # Asegúrate de pasar los argumentos username y password al llamar login() aquí
    login("10182", "222")