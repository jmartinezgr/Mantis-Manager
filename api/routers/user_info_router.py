from fastapi import APIRouter, Depends, HTTPException, Request, Query, status
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from models.user_model import User
from config.db import get_db
from schemas.auth_schema import UserOut, UserUpdate, PaginatedUsers  

user_info_router = APIRouter(tags=["Acciones del Jefe de Desarrollo"])

@user_info_router.get(
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
def get_user_info(
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

    # Verificar permisos: scopes == 1 indica jefe de desarrollo (ajusta según tu lógica)
    if current_user.get("scopes") != 1:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="No tienes permisos para ver la información de los usuarios"
        )
    
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

    
@user_info_router.put("/user_info/{user_id}", 
                      summary="Actualizar información de un usuario",
                      description="Permite al jefe de desarrollo actualizar el correo electrónico, rol o teléfono de un usuario específico.",
                      response_model=UserOut)
def update_user_info(
    user_id: int,
    user_update: UserUpdate,
    request: Request,
    token: str = Depends(HTTPBearer()),
    db: Session = Depends(get_db)
):
    """
    Actualiza la información de un usuario específico.

    - **user_id**: ID del usuario a actualizar.
    - **user_update**: Datos a actualizar (email, role_id, phone).
    - **token**: Token de autenticación requerido.
    """
    # Obtener el usuario que realiza la petición
    current_user = request.state.user

    # Verificar que el usuario tenga permisos de jefe de desarrollo
    if current_user.get("scopes") != 1:
        return JSONResponse(status_code=403,content="No tienes permisos para realizar esta acción.")

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