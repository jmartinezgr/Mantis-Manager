from infrastructure.database.connection import Connection
from .password_manager import hash_password, check_password

class Auth_Repository:
    
    _SELECT_USER = "SELECT * FROM usuarios WHERE cedula = ?"
    
    def __init__(self) -> None:
        self.conexion = Connection().get_connection()
        self.cursor = Connection.get_cursor()
        
    def verify_user(self, username:str, password:str)  -> dict:
        # Intentar ejecutar la consulta para verificar al usuario
        try:
            self.cursor.execute(self._SELECT_USER, (username,))
        except Exception as e:
            print("Error al consultar la base de datos:e ", e)
            return {"error": f"Error al consultar la base de datos: {str(e)}"}
        
        user = self.cursor.fetchone()
        
        if user is None:
            return {"error": "Usuario no encontrado"}
        
        hashed_password = user["contrasena"]
        if not check_password(hashed_password, password):
            return {"error": "Contraseña incorrecta"}   
        
        return user