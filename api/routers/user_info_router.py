from fastapi import APIRouter, Depends, HTTPException, Request, Query
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from models.user_model import User
from config.db import get_db

user_info_router = APIRouter(tags=["User Information"])

@user_info_router.get("/user_info", summary="Obtener información paginada de los usuarios", 
                      description="Este endpoint devuelve información paginada de los usuarios, "
                                  "como el nombre completo, correo electrónico, rol y teléfono. "
                                  "Requiere autenticación con un token válido y permisos adecuados.",
                      response_description="Un JSON con la información de los usuarios paginados.")
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
    user = req.state.user

    if user.get("scopes") != 1:
        return JSONResponse(status_code=401, content={"error": "No tienes permisos para ver la información de los usuarios"})
    
    # Calcular el offset en base al número de página
    offset = (page - 1) * limit

    # Consultar los usuarios con límite y offset para paginación
    users = db.query(User).offset(offset).limit(limit).all()

    # Mapeo de los datos de los usuarios
    users_data = [
        {
            "full_name": f"{user.first_name} {user.last_name}",  # Unir first_name y last_name
            "email": user.email,  # Correo electrónico
            "role": user.role.name,  # Obtener el nombre del rol a través de la relación
            "phone": user.phone  # Teléfono
        } 
        for user in users
    ]

    # Total de usuarios en la base de datos
    total_users = db.query(User).count()

    # Retornar los datos de paginación y los usuarios
    return {
        "page": page,
        "limit": limit,
        "total_users": total_users,
        "users": users_data
    }