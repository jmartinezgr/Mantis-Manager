from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

class RequestData(BaseModel):
    id: int
    description: str
    status: str
    type: str
    ticket_id: int
    created_at: datetime

    @validator('status')
    def status_must_be_valid(cls, v):
        valid_status = ["pendiente", "aceptada", "rechazada"]
        if v not in valid_status:
            raise ValueError("El estado debe ser uno de los siguiente: aceptada, pendiente, rechazada")
        return v

    @validator('type')
    def type_must_be_valid(cls, v):
        valid_types = ["apertura", "cierre"]
        if v not in valid_types:
            raise ValueError("El tipo debe ser uno de los siguiente: apertura, cierre")
        return v


class RequestCreate(BaseModel):
    description: str
    type: str #solicitud de "cierre" o "apertura"
    ticket_id: int

    @validator('type')
    def type_must_be_valid(cls, v):
        valid_types = ["apertura", "cierre"]
        if v not in valid_types:
            raise ValueError("El tipo debe ser uno de los siguiente: apertura, cierre")
        return v


class RespondRequest(BaseModel):
    status: str  # "aceptada" o "rechazada"

    @validator('status')
    def status_must_be_valid(cls, v):
        valid_status = ["aceptada", "rechazada"]
        if v not in valid_status:
            raise ValueError("El estado debe ser uno de los siguientes: aceptada, rechazada")
        return v
