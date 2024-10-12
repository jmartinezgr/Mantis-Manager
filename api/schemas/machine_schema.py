from pydantic import BaseModel, field_validator
from typing import List, Optional

class MachineActionResponse(BaseModel):
    detail: str

class MachineData(BaseModel):
    id: str
    type: str
    brand: str
    model: str
    serial: str
    description: str
    action: str
    
    @field_validator('id', mode='before')
    def validate_id(cls, id):
        if not id:
            raise ValueError("El ID no puede ser nulo")
        
        # Convertimos el id a minúsculas y eliminamos los espacios
        id = id.strip()
        
        # Verificamos que sea alfanumérico y que tenga longitud <= 3
        if not id.isalnum() or len(id) > 3:
            raise ValueError('El id debe ser alfanumérico y tener máximo 3 caracteres.')
        return id

    @field_validator('action', mode='before')
    def validate_action(cls, action):
        # Lista de acciones válidas
        action_list = ['tejer', 'teñir', 'urdir', 'fijar']
        
        # Convertimos la acción a minúsculas y eliminamos los espacios
        action = action.strip().lower()
        
        if not action:
            raise ValueError("La acción no puede ser nula")
        
        if action not in action_list:
            raise ValueError('La acción debe ser una de las siguientes: tejer, teñir, urdir, fijar.')
        
        return action
 
class MachineList(BaseModel):
    machines: List[MachineData] 
    
# Esquema para actualizar una máquina
class MachineUpdate(BaseModel):
    type: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    serial: Optional[str] = None
    description: Optional[str] = None 
    action: Optional[str] = None