from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

class TicketData(BaseModel):
    description: str
    state: str
    machine_serial: str
    created_by: int
    assigned_to: Optional[int] = None
    created_at: datetime

    @validator('state')
    def state_must_be_valid(cls, v):
        valid_states = ["pendiente", "asignado", "en progreso", "finalizado"]
        if v not in valid_states:
            raise ValueError('El estado debe ser uno de los siguientes: pendiente, en progreso, finalizado')
        return v
    

class TicketCreate(BaseModel):
    description: str
    machine: str  

class TicketUpdate(BaseModel):
    description: Optional[str] = None
    state: Optional[str] = None
    assigned_to: Optional[str] = None

    @validator('state')
    def state_must_be_valid(cls, v):
        if v:
            valid_states = ["pendiente", "asignado", "en progreso", "finalizado"]
            if v not in valid_states:
                raise ValueError('El estado debe ser uno de los siguientes: pendiente, en progreso, finalizado')
        return v

