"""Este modulo contiene funciones que permiten la autenticacion de usuarios aplicando logica de negocio"""

import auth_repository

def login(username:str, password:str):
    """Función que permite el login de un usuario"""

    response = auth_repository.AuthRepository().verify_user(username, password)

    # Aquí llamamos al repositorio de autenticación para verificar el usuario
    if response["error"]  is None:
        return (True,"Login exitoso")
    else:
        if auth_repository["error"] == "Usuario no encontrado":
            return (False,"Usuario no encontrado")
        else:
            return (False,"Contraseña incorrecta")

if __name__ == "__main__":
    login()