from pydantic import BaseModel, field_validator, Field, EmailStr
from typing import Optional
from datetime import datetime
from typing import List, Literal
from enum import Enum

class RelacionatedRequest(BaseModel):
    id: int
    type: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 101,
                "type": "cierre"
            }
        }

class UserBaseInfo(BaseModel):
    id: str
    name: str
    email: EmailStr
    rol_id: int

    class Config:
        json_schema_extra = {
            "example": {
                "id": "12345",
                "name": "Juan José Martinez",
                "email": "jjmartinez@example.com",
                "rol_id": 2
            }
        }

class TicketStandartResponse(BaseModel):
    id: int
    description: str
    state: str
    created_at: datetime
    priority: str   
    deadline: datetime
    machine_id: str
    created_by: UserBaseInfo
    assigned_to: Optional[UserBaseInfo] = None
    related_open_requests: Optional[List[RelacionatedRequest]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "description": "Reparación de máquina X",
                "state": "pendiente",
                "created_at": "2024-10-13T12:34:56.789Z",
                "priority": "alta",
                "deadline": "2024-10-20T12:00:00Z",
                "machine_id": "T10",
                "created_by": {
                    "id": "1018224606",
                    "name": "Juan José Martinez",
                    "email": "jjmartinez@example.com",
                    "rol_id": 2
                },
                "assigned_to": {
                    "id": "1036252622",
                    "name": "Manuela Valencia",
                    "email": "mvalencia@example.com",
                    "rol_id": 3
                },
                "related_open_requests": [
                    {
                        "id": 101,
                        "type": "cierre"
                    }
                ]
            }
        }
        
class PaginatedTickets(BaseModel):
    page: int
    limit: int
    total_tickets: int
    tickets: List[TicketStandartResponse]
    is_last_page: bool
    
class TicketCreate(BaseModel):
    description: str
    machine: str
    priority: Literal["baja", "media", "alta"]

class TicketCloseInfo(BaseModel):
    time_spent: float = Field(..., example=5.5, description="Tiempo empleado en horas")
    days_used: int = Field(..., example=2, description="Días que se emplearon")
    parts_used: List[str] = Field(..., example=["Repuesto1", "Repuesto2"], description="Lista de repuestos utilizados")
    procedure: str = Field(..., example="Procedimiento detallado realizado", description="Procedimiento empleado")
    final_description: str = Field(..., example="La máquina está funcionando correctamente.", description="Descripción general del estado final de la máquina")

    class Config:
        json_schema_extra = {
            "example": {
                "time_spent": 5.5,
                "days_used": 2,
                "parts_used": ["Repuesto1", "Repuesto2"],
                "procedure": "Procedimiento detallado realizado",
                "final_description": "La máquina está funcionando correctamente.",
            }
        }

class TicketSolicitudInfo(BaseModel):
    detail: str
    id_solicitud: int
    
class EventType(str, Enum):
    CREATION = "creación"
    STATE_CHANGE = "cambio de estado"
    CLOSE_REQUEST = "solicitud de cierre"
    CLOSURE = "cierre"
    ASIGNATION = "asignacion"

class Record(BaseModel):
    id: int
    description: str
    created_at: datetime
    event_type: EventType

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "description": "Creación del ticket por el usuario Juan José Martinez.",
                "created_at": "2024-10-14T10:00:00Z",
                "event_type": "creación"
            }
        }