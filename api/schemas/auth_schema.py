from pydantic import BaseModel

class LoginData(BaseModel):
    id: str
    password: str
    
class RegisterData(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    id: str
    password: str
    role: str