from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class LoginData(BaseModel):
    """Esquema para los datos de inicio de sesión."""
    id: str
    password: str

class RegisterData(BaseModel):
    """Esquema para registrar un nuevo usuario."""
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    password: str
    role_id: int

class UserUpdate(BaseModel):
    """Esquema para la actualización de datos de usuario."""
    email: Optional[EmailStr] = Field(None, description="Nuevo correo electrónico del usuario.")
    role_id: Optional[int] = Field(None, description="Nuevo ID del rol del usuario.")
    phone: Optional[str] = Field(None, description="Nuevo número de teléfono del usuario.")

class UserOut(BaseModel):
    """Esquema de salida para mostrar información del usuario."""
    id: int
    full_name: str
    email: EmailStr
    role: str
    phone: str

    class Config:
        from_attributes = True

class PaginatedUsers(BaseModel):
    """Esquema para la paginación de usuarios."""
    page: int
    limit: int
    total_users: int
    users: List[UserOut]

class CreatedUser(BaseModel):
    """Esquema para la respuesta de usuario creado."""
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    role_id: int
    access_token: str
    refresh_token: str

class UserData(BaseModel):
    """Esquema para los datos de un usuario en una respuesta."""
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    role_id: int

class LoginResponse(BaseModel):
    """Esquema para la respuesta al iniciar sesión."""
    message: str
    data: UserData
    access_token: str
    refresh_token: str