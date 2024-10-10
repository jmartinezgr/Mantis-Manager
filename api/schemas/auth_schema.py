from pydantic import BaseModel, EmailStr, Field
from typing import List,Optional

class LoginData(BaseModel):
    id: str
    password: str
    
class RegisterData(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    phone: str
    password: str
    role: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = Field(None, description="Nuevo correo electrónico del usuario.")
    role_id: Optional[int] = Field(None, description="Nuevo ID del rol del usuario.")
    phone: Optional[str] = Field(None, description="Nuevo número de teléfono del usuario.")
    
class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    phone: Optional[str]

    class Config:
        from_attributes = True

class PaginatedUsers(BaseModel):
    page: int
    limit: int
    total_users: int
    users: List[UserOut]