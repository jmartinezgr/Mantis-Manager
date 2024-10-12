import os
import shutil

from fastapi import APIRouter, Depends, File, HTTPException, Path, Request, UploadFile
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from config.db import get_db
from models.user_model import User
from schemas.user_schema import ImageResponse


# Crear directorio 'images' si no existe
os.makedirs("images", exist_ok=True)

# Crear el router para manejar las imágenes de los usuarios
user_image_router = APIRouter(tags=["Users Images"])

@user_image_router.post(
    "/users/upload/{user_id}",
    summary="Subir una imagen de perfil para un usuario específico",
    description=(
        "Este endpoint permite a un usuario autenticado subir una imagen de perfil. Si el usuario ya "
        "tiene una imagen guardada, esta se eliminará antes de almacenar la nueva."
    ),
    response_model=ImageResponse,
    response_description="path donde se encuentra la imagen.",
)
async def upload_user_image(
    user_id: int = Path(..., title="ID del usuario", description="ID del usuario al que corresponde la imagen"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    token: str = Depends(HTTPBearer()),
    req: Request = None
):
    """
    Sube una imagen de perfil para un usuario específico.
    
    Este endpoint permite a un usuario autenticado subir una imagen de perfil. Si el usuario ya 
    tiene una imagen guardada, esta se eliminará antes de almacenar la nueva.

    Args: 
        user_id: ID del usuario que sube la imagen.
        file: Imagen que se va a subir (debe ser un archivo de tipo imagen).

    Returns: 
        Mensaje de éxito y el path donde se encuentra la imagen.
    """

    # Obtener el ID del usuario desde el token
    token_id = req.state.user["sub"]

    # Verificar que el usuario autenticado coincida con el ID de la ruta
    if user_id != token_id:
        raise HTTPException(status_code=403, detail="No tienes permisos para subir una imagen a este usuario.")

    # Comprobar si el usuario existe en la base de datos
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Verificar si el archivo es una imagen
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo no es una imagen")

    # Eliminar la imagen anterior si existe
    if user.image_field and os.path.exists(user.image_field):
        os.remove(user.image_field)

    # Extraer la extensión del archivo
    extension = file.filename.split(".")[-1]

    # Definir la ubicación del archivo con la extensión correcta
    file_location = f"images/{user_id}.{extension}"

    # Guardar la imagen en el servidor
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Actualizar el campo de imagen en la base de datos
    user.image_field = file_location
    db.commit()
    db.refresh(user)

    # Retornar la respuesta con el path de la imagen
    return ImageResponse(path = f'/users/image/{user_id}')

@user_image_router.get(
    "/users/image/{user_id}",
    summary="Obtener la imagen de perfil de un usuario específico",
    description="Obtiene la imagen de perfil de un usuario específico.",
    response_description="Archivo de imagen.",
    response_class=FileResponse 
)
async def get_user_image(
    user_id: int = Path(..., title="ID del usuario", description="ID del usuario al que corresponde la imagen"),
    db: Session = Depends(get_db),
    token: str = Depends(HTTPBearer()),
    req: Request = None
):
    """
    Obtiene la imagen de perfil de un usuario específico.
    Este endpoint permite a un usuario autenticado obtener su propia imagen de perfil almacenada en el servidor.

    Args:
        user_id: ID del usuario cuya imagen se desea obtener.

    Returns:
        El archivo de imagen si existe o un error si no se encuentra.
    """

    # Obtener el ID del usuario desde el token
    token_id = req.state.user["sub"]

    # Verificar que el usuario autenticado coincida con el ID de la ruta
    if user_id != token_id:
        raise HTTPException(status_code=403, detail="No tienes permisos para acceder a esta imagen.")

    # Buscar el usuario en la base de datos
    user = db.query(User).filter(User.id == user_id).first()

    # Verificar si el usuario tiene una imagen asociada
    if not user or not user.image_field:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")

    # Verificar que el archivo de imagen exista en el servidor
    file_path = user.image_field
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")

    # Retornar el archivo de imagen
    return FileResponse(file_path)