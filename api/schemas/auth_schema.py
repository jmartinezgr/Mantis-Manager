from pydantic import BaseModel, validator

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

