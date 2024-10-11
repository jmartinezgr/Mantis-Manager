import datetime

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from passlib.context import CryptContext
from sqlalchemy.orm import Session

from config.db import get_db
from models.user_model import User
from schemas.auth_schema import LoginData , LoginResponse
from services.jwt_services import create_acess_token, create_refresh_token 


# Crear un objeto de contexto de cifrado con bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#Crear un router
user_auth_router = APIRouter(tags=["Users Authentification"])

# Ruta para iniciar sesión
@user_auth_router.post("/login", response_model=LoginResponse)
async def login(data: LoginData, db: Session = Depends(get_db)):
    """
    Iniciar sesión en el sistema y generar tokens de acceso y refresco.
    
    Este endpoint permite a un usuario sin autenticar subir iniciar sesion en el sistema.
    Esto se logra verificando las credenciales del usuario y generando tokens de acceso y refresco.

    Parámetros:
    - data: Datos de inicio de sesión (ID y contraseña).
    - db: Sesión de la base de datos. (Dependencia)

    Retorna:
    - Mensaje de éxito, los datos del usuario y los tokens de acceso y refresco.
    """
    user = db.query(User).filter(User.id == data.id).first()

    # Verificar si el usuario existe y si la contraseña es correcta
    if not user or not user.verify_password(data.password):
        return JSONResponse(status_code=400, content={
            "error": "Credenciales incorrectas"
        })

    # Datos del usuario autenticado
    user_data = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "phone": user.phone,
        "role_id": user.role_id
    }
    
    from services.web_socket_service import ConnectionManager
    
    await ConnectionManager.send_message({
        "type": "Login",
        "message": "Se ha logueado"
    },
    user.id)

    # Crear tokens de acceso y refresco
    token_info = {"sub": user.id, "scopes": user.role_id}
    access_token = create_acess_token(data=token_info)
    refresh_token = create_refresh_token(data=token_info)

    # Respuesta con el token y datos del usuario
    return JSONResponse(status_code=200, content={
        "message": "Te has logueado correctamente",
        "data": user_data,
        "access_token": access_token,
        "refresh_token": refresh_token
    })