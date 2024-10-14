from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime

class TicketData(BaseModel):
    description: str
    priority: str
    machine_id: str
    created_by: str
    
class TicketResponse(BaseModel):
    id: int
    description: str
    state: str
    created_at: datetime
    priority: str   
    deadline: datetime
    machine_id: str
    created_by: str
    assigned_to: Optional[str] = None
    
    
class TicketSearchResponse(BaseModel):
    id: int
    description: str
    state: str
    priority: str
    machine_serial: Optional[str] = None  # Serial de la máquina
    created_by_id: int  # ID del creador
    created_by_name: Optional[str] = None  # Nombre completo del creador
    assigned_to_id: Optional[int] = None  # ID del asignado (si existe)
    assigned_to_name: Optional[str] = None  # Nombre completo del asignado (si existe)
    created_at: datetime
    deadline: Optional[datetime] = None  # Fecha límite (si existe)

class TicketCreate(BaseModel):
    description: str
    machine: str
    priority: str


class TicketStateUpdate(BaseModel):
    state: str  # Estado al que se quiere cambiar el ticket

    @field_validator('state')
    def validate_state(cls, v):
        valid_states = ["asignado", "en proceso", "pendiente"]
        if v not in valid_states:
            raise ValueError('El estado debe ser uno de los siguientes: asignado, en proceso, pendiente')
        return v


class TicketAssign(BaseModel):
    assigned_to: str  # ID del usuario a asignar al ticket

    @field_validator('assigned_to')
    def validate_assigned_to(cls, v):
        if not v:
            raise ValueError('El ID del operario no puede estar vacío')
        return v