import os
import shutil
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    Path,
    Request,
    UploadFile,
)
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session

from config.db import get_db
from models.user_model import User
from schemas.user_schema import ImageResponse

# Crear directorio 'images' si no existe
IMAGE_DIRECTORY = "images"
os.makedirs(IMAGE_DIRECTORY, exist_ok=True)

# Crear el router para manejar las imágenes de los usuarios
user_image_router = APIRouter(tags=["Users Images"])

# Definir el esquema de respuesta si no lo tienes
class ImageResponse(BaseModel):
    path: str

    class Config:
        from_attributes = True

@user_image_router.post(
    "/users/upload/{user_id}",
    summary="Subir una imagen de perfil para un usuario específico",
    description=(
        "Este endpoint permite a un usuario autenticado subir una imagen de perfil. Si el usuario ya "
        "tiene una imagen guardada, esta se eliminará antes de almacenar la nueva."
    ),
    response_model=ImageResponse,
    response_description="URL donde se encuentra la imagen.",
)
async def upload_user_image(
    user_id: int = Path(..., title="ID del usuario", description="ID del usuario al que corresponde la imagen"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    token: str = Depends(HTTPBearer()),
    request: Request = None
):
    """
    Sube una imagen de perfil para un usuario específico.
    
    Este endpoint permite a un usuario autenticado subir una imagen de perfil. Si el usuario ya 
    tiene una imagen guardada, esta se eliminará antes de almacenar la nueva.

    Args: 
        user_id: ID del usuario que sube la imagen.
        file: Imagen que se va a subir (debe ser un archivo de tipo imagen).

    Returns: 
        Mensaje de éxito y la URL donde se encuentra la imagen.
    """

    # Obtener el ID del usuario desde el token
    token_id = request.state.user["sub"]

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

    # Opcional: Verificar el tamaño del archivo
    contents = await file.read()
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="El archivo excede el tamaño máximo permitido de 5MB.")
    # Resetear el cursor del archivo
    file.file.seek(0)

    # Eliminar la imagen anterior si existe
    if user.image_field and os.path.exists(user.image_field):
        os.remove(user.image_field)

    # Extraer la extensión del archivo
    extension = os.path.splitext(file.filename)[1].lower()
    if extension not in [".jpg", ".jpeg", ".png", ".gif"]:
        raise HTTPException(status_code=400, detail="Extensión de archivo no soportada.")

    # Generar un nombre de archivo único para evitar colisiones
    unique_filename = f"{uuid4().hex}{extension}"
    file_location = os.path.join(IMAGE_DIRECTORY, unique_filename)

    # Guardar la imagen en el servidor
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Actualizar el campo de imagen en la base de datos
    user.image_field = file_location
    db.commit()
    db.refresh(user)

    # Generar la URL de acceso a la imagen
    image_url = request.url_for("get_user_image", user_id=user_id)

    # Retornar la respuesta con la URL de la imagen
    return ImageResponse(path=image_url)


@user_image_router.get(
    "/users/image/{user_id}",
    name="get_user_image",  # Añadir nombre para generar URLs
    summary="Obtener la imagen de perfil de un usuario específico",
    description="Obtiene la imagen de perfil de un usuario específico.",
    response_description="Archivo de imagen.",
    response_class=FileResponse 
)
async def get_user_image(
    user_id: int = Path(..., title="ID del usuario", description="ID del usuario al que corresponde la imagen"),
    db: Session = Depends(get_db),
    token: str = Depends(HTTPBearer()),
    request: Request = None
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
    token_id = request.state.user["sub"]

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