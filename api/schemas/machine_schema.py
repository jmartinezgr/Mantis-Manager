from pydantic import BaseModel
from typing import List, Optional

# Esquema para crear una nueva máquina
class MachineCreate(BaseModel):
    type: str
    brand: str
    serial: str
    action: str

# Esquema para actualizar una máquina
class MachineUpdate(BaseModel):
    type: Optional[str] = None
    brand: Optional[str] = None
    serial: Optional[str] = None
    action: Optional[str] = None

# Esquema para representar los datos de una máquina
class MachineData(BaseModel):
    id: int
    type: str
    brand: str
    serial: str
    action: str
"""
    # Relación con los tickets asociados (opcional)
    tickets: Optional[List[str]] = None
"""

