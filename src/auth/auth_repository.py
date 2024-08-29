from ..infrastructure.database.connection import Connection 
import password_manager

class Auth_Repository:
    
    _SELECT_USER = "SELECT * FROM users WHERE cedula = ?"
    
    def __init__(self) -> None:
        self.conexion = Connection().get_connection()
        self.cursor = Connection.get_cursor()
        

    def verify_user(self, username:str, password:str)  -> dict:
        self.cursor.execute(self._SELECT_USER, (username,))
        
        user = self.cursor.fetchone()
        
        if user is None:
            return {"error": "Usuario no encontrado"}
        
        
        hashed_password = user["contrasena"]
        if not password_manager.verify_password(hashed_password, password):
            return {"error": "Contraseña incorrecta"}
        
        return user