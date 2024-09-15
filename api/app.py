from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer

from passlib.context import CryptContext
from sqlalchemy.orm import Session

from config.db import get_db
from middlewares.auth_midddleware import AuthMiddleware
from models.user_model import User, Role
from schemas.auth_schema import LoginData, RegisterData
from services.jwt_services import create_acess_token, create_refresh_token, verify_refresh_token

# Crear un objeto de contexto de cifrado con bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Crear la instancia principal de FastAPI
app = FastAPI(
    title="MANTIS MANAGER API",
    description="Servicios para la gestión de mantenimiento de Balalika S.A",
    version="0.1"
)

# Agregar el middleware de autenticación
app.add_middleware(AuthMiddleware)

# Definir el esquema de seguridad Bearer Token
bearer_scheme = HTTPBearer()

# Ruta protegida con token
@app.post("/token/refresh")
async def refresh_token(req: Request, dependencies=Depends(bearer_scheme)):
    """
    Refresca los tokens JWT si el refresh token es válido.
    """
    
    try:
        # Obtiene el refresh token del encabezado de autorización
        refresh_token = req.headers.get("Authorization").split(" ")[1]
        
        # Verifica el refresh token
        payload = verify_refresh_token(refresh_token)
        
        # Crea un nuevo token de acceso y refresh token
        new_access_token = create_acess_token(data={"sub": payload["sub"], "scopes": payload["scopes"]})
        new_refresh_token = create_refresh_token(data={"sub": payload["sub"], "scopes": payload["scopes"]})
        
        return JSONResponse(status_code=200, content={
            "access_token": new_access_token,
            "refresh_token": new_refresh_token
        })
    
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content=e.detail)

# Ruta para iniciar sesión
@app.post("/login")
async def login(data: LoginData, db: Session = Depends(get_db)):
    """
    Autenticar al usuario y generar tokens de acceso y refresco.
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

# Ruta para registrar un nuevo usuario
@app.post("/register")
async def register(data: RegisterData, db: Session = Depends(get_db)):
    """
    Registrar un nuevo usuario en el sistema y generar tokens.
    """
    # Verificar si el usuario ya existe
    user = db.query(User).filter(User.id == data.id).first()
    if user:
        return JSONResponse(status_code=400, content={
            "error": "El usuario ya existe"
        })

    # Verificar si el rol existe
    role_id = db.query(Role).filter(Role.name == data.role).first()
    if not role_id:
        return JSONResponse(status_code=400, content={
            "error": "El rol no existe"
        })

    # Crear el nuevo usuario con los datos proporcionados
    new_user = User(
        id=data.id,
        password=pwd_context.hash(data.password),  # Hashear la contraseña
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        phone=data.phone,
        role_id=role_id.id
    )

    # Guardar el usuario en la base de datos
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Crear tokens de acceso y refresco para el nuevo usuario
    access_token = create_acess_token(data={"sub": new_user.id, "scopes": new_user.role_id})
    refresh_token = create_refresh_token(data={"sub": new_user.id, "scopes": new_user.role_id})

    # Respuesta con el token y datos del nuevo usuario
    return JSONResponse(status_code=200, content={
        "detail": "Usuario creado correctamente",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "data": {
            "id": new_user.id,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "email": new_user.email,
            "phone": new_user.phone,
            "role_id": new_user.role_id
        }
    })