from pydantic import BaseModel, validator

class LoginData(BaseModel):
    email: str
    password: str
    

class RegisterData(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: int
    password: str
    role: str

    @validator('phone')
    def phone_must_be_valid(cls, v):
        if v <= 0:
            raise ValueError('El número de teléfono debe ser un entero positivo')
        length = len(str(v))
        if length < 7 or length > 15:
            raise ValueError('El número de teléfono debe tener entre 7 y 15 dígitos')
        return v
