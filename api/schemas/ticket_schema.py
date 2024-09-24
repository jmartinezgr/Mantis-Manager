from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

class TicketData(BaseModel):
    id: int
    description: str
    state: str
    priority: str
    machine_serial: str
    created_by: str
    assigned_to: Optional[str] = None
    created_at: datetime
    deadline: Optional[datetime]

    @validator('state')
    def state_must_be_valid(cls, v):
        valid_states = ["pendiente", "asignado", "en proceso", "finalizado"]
        if v not in valid_states:
            raise ValueError('El estado debe ser uno de los siguientes: pendiente, en proceso, finalizado')
        return v
    

class TicketCreate(BaseModel):
    description: str
    machine: str
    priority: str


class TicketStateUpdate(BaseModel):
    state: str  # Estado al que se quiere cambiar el ticket

    @validator('state')
    def validate_state(cls, v):
        valid_states = ["asignado", "en proceso", "pendiente"]
        if v not in valid_states:
            raise ValueError('El estado debe ser uno de los siguientes: asignado, en proceso, pendiente')
        return v


class TicketAssign(BaseModel):
    assigned_to: str  # ID del usuario a asignar al ticket

    @validator('assigned_to')
    def validate_assigned_to(cls, v):
        if not v:
            raise ValueError('El ID del operario no puede estar vacío')
        return v
