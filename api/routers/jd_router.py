from fastapi import APIRouter, Depends, HTTPException, Request, Query, status
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from sqlalchemy import func
from passlib.context import CryptContext

from schemas.auth_schema import UserOut, UserUpdate, PaginatedUsers, UserData
from schemas.auth_schema import RegisterData, CreatedUser
from services.jwt_services import create_acess_token, create_refresh_token 
from models.user_model import User, Role
from config.db import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

jd_router = APIRouter(
    tags=["Acciones del Jefe de Desarrollo"],
    prefix="/jefe_desarrollo"
)

@jd_router.get(
    "/user_info",
    summary="Obtener información paginada de los usuarios",
    description=(
        "Este endpoint devuelve información paginada de los usuarios, "
        "como el nombre completo, correo electrónico, rol y teléfono. "
        "Requiere autenticación con un token válido y permisos adecuados."
    ),
    response_model=PaginatedUsers,  # Especifica el modelo de respuesta
    response_description="Un JSON con la información de los usuarios paginados."
)
async def get_user_info(
    req: Request = None, 
    token: str = Depends(HTTPBearer()), 
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Número de la página que se desea obtener. Comienza en 1."),  
    limit: int = Query(10, ge=1, description="Cantidad de usuarios por página. Valor predeterminado: 10.") 
):
    """
    Devuelve la información de los usuarios en formato paginado.

    - **token**: Token de autenticación requerido.
    - **page**: Número de la página que se desea obtener (empieza en 1).
    - **limit**: Cantidad de usuarios por página (el valor predeterminado es 10).
    - **full_name**: Nombre completo del usuario (unión de `first_name` y `last_name`).
    - **email**: Correo electrónico del usuario.
    - **role**: Nombre del rol del usuario.
    - **phone**: Teléfono del usuario.
    
    Responde con un JSON que contiene:
    - **page**: Número de la página solicitada.
    - **limit**: Cantidad de usuarios devueltos en la página.
    - **total_users**: Número total de usuarios en la base de datos.
    - **users**: Lista de usuarios con su información filtrada.
    """
    current_user = req.state.user
    
    # Calcular el offset en base al número de página
    offset = (page - 1) * limit

    # Consultar los usuarios con límite y offset para paginación
    users = db.query(User).offset(offset).limit(limit).all()

    # Mapeo de los datos de los usuarios utilizando UserOut
    users_data = [
        UserOut(
            id=user.id,
            full_name=f"{user.first_name} {user.last_name}",
            email=user.email,
            role=user.role.name,
            phone=user.phone
        ) 
        for user in users
    ]

    # Total de usuarios en la base de datos
    total_users = db.query(User).count()

    # Retornar los datos de paginación y los usuarios
    paginated_response = PaginatedUsers(
        page=page,
        limit=limit,
        total_users=total_users,
        users=users_data
    )

    return paginated_response

@jd_router.get("/user_info/{user_id}",
               summary="Obtener información de un usuario específico",
    description="Devuelve la información de un usuario específico.",
    response_model=UserData
)
async def get_user_by_id( 
    user_id: int, 
    token: str = Depends(HTTPBearer()), 
    db: Session = Depends(get_db)
):
    """
    Devuelve la información de un usuario específico.

    - **user_id**: ID del usuario a obtener.
    - **token**: Token de autenticación requerido.
    """
    # Consultar el usuario por ID
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return JSONResponse(status_code=404, content={"error": "Usuario no encontrado"})

    # Preparar la respuesta con los datos del usuario
    user_data = UserData(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        phone=user.phone,
        role_id=user.role_id
    )

    return user_data

@jd_router.put("/user_info/{user_id}", 
    summary="Actualizar información de un usuario",
    description="Permite al jefe de desarrollo actualizar el correo electrónico, rol o teléfono de un usuario específico.",
    response_model=UserOut
)
async def update_user_info(
    user_id: int,
    user_update: UserUpdate,
    token: str = Depends(HTTPBearer()),
    db: Session = Depends(get_db)
):
    """
    Actualiza la información de un usuario específico.

    - **user_id**: ID del usuario a actualizar.
    - **user_update**: Datos a actualizar (email, role_id, phone).
    - **token**: Token de autenticación requerido.
    """
    
    # Obtener el usuario a actualizar
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return  JSONResponse(status_code=404, content={"error": "Usuario no encontrado"})
        
    # Actualizar los campos proporcionados
    if user_update.email:
        user.email = user_update.email
    if user_update.role_id:
        user.role_id = user_update.role_id
    if user_update.phone:
        user.phone = user_update.phone

    # Confirmar los cambios en la base de datos
    db.commit()
    db.refresh(user)

    # Preparar la respuesta
    updated_user = UserOut(
        id=user.id,
        full_name=f"{user.first_name} {user.last_name}",
        email=user.email,
        role=user.role.name,
        phone=user.phone
    )

    return updated_user

@jd_router.post(
    "/register",
    summary="Registrar un nuevo usuario",
    description="Permite al jefe de desarrollo crear un nuevo usuario.", 
    response_model=CreatedUser
)
async def register(
    data: RegisterData, 
    db: Session = Depends(get_db), 
    token: str = Depends(HTTPBearer())
):
    """
    Registrarse en el sistema y generar tokens de acceso y refresco.
    """
    # Verificar si el id ya está registrado
    existing_user = db.query(User).filter(User.id == data.id).first()
    if existing_user:
        return JSONResponse(status_code=400, content={
            "error": "El email ya está registrado"
        })

    # Normalizar data.role eliminando espacios y convirtiendo a minúsculas
    data_role_normalized = data.role.strip().lower()

    # Normalizar los nombres de los roles en la consulta
    role = db.query(Role).filter(func.lower(func.trim(Role.id)) == data_role_normalized).first()

    # Mostrar los roles disponibles para depuración
    roles = db.query(Role).all()

    if not role:
        available_roles = db.query(Role).all()
        available_role_names = [r.name for r in available_roles]
        return JSONResponse(status_code=400, content={
            "error": "El rol no existe",
        })

    # Crear el nuevo usuario con los datos proporcionados
    new_user = User(
        id=data.id,
        password=pwd_context.hash(data.password),
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        phone=data.phone,
        role_id=role.id
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