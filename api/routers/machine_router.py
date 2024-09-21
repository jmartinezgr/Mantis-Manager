from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from typing import List

from config.db import get_db
from models.machine_model import Machine
from schemas.machine_schema import MachineCreate, MachineUpdate, MachineData

bearer_scheme = HTTPBearer()

# Crear un router para las máquinas
machine_router = APIRouter(tags=["Machines"])

# Crear una máquina (POST)
@machine_router.post("/machines", response_model=MachineData)
async def create_machine(machine: MachineCreate, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    El jefe de nuevos desarrollos podrá crear una nueva maquina.
    
    Parámetros:
    - machine: Datos de la máquina a crear(tipo, marca, serial, acción).
    - db: Sesión de la base de datos (dependencia).
    
    Retorna:
    - Datos de la máquina creada.
    """
    new_machine = Machine(  
        type=machine.type,
        brand=machine.brand,
        serial=machine.serial,
        action=machine.action
    )
    
    db.add(new_machine)
    db.commit()
    db.refresh(new_machine)
    
    return new_machine

# Obtener todas las máquinas (GET)
@machine_router.get("/machines", response_model=List[MachineData])
async def get_all_machines(db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene todas las máquinas registradas.
    
    Retorna:
    - Lista de máquinas.
    """
    machines = db.query(Machine).all()
    return machines

# Obtener una máquina por ID (GET)
@machine_router.get("/machines/{machine_id}", response_model=MachineData)
async def get_machine(machine_id: str, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene una máquina por su ID.
    
    Parámetros:
    - machine_id: ID de la máquina.
    
    Retorna:
    - Datos de la máquina encontrada.
    """
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    
    if not machine:
        raise HTTPException(status_code=404, detail="Máquina no encontrada")
    
    return machine

# Actualizar una máquina (PUT)
@machine_router.put("/machines/{machine_id}", response_model=MachineData)
async def update_machine(
    machine_id: str,
    machine_data: MachineUpdate, 
    db: Session = Depends(get_db),
    dependencies=Depends(bearer_scheme)
):
    """
    Actualiza una máquina existente.
    
    Parámetros:
    - machine_id: ID de la máquina a actualizar.
    - machine_data: Datos a actualizar (tipo, marca, serial, acción).
    
    Retorna:
    - Datos de la máquina actualizada.
    """
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    
    if not machine:
        raise HTTPException(status_code=404, detail="Máquina no encontrada")
    
    # Actualizar los campos
    for key, value in machine_data.dict(exclude_unset=True).items():
        setattr(machine, key, value)
    
    db.commit()
    db.refresh(machine)
    
    return machine

# Eliminar una máquina (DELETE)
@machine_router.delete("/machines/{machine_id}", response_model=dict)
async def delete_machine(machine_id: str, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Elimina una máquina por su ID.
    
    Parámetros:
    - machine_id: ID de la máquina a eliminar.
    
    Retorna:
    - Mensaje de confirmación.
    """
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    
    if not machine:
        raise HTTPException(status_code=404, detail="Máquina no encontrada")
    
    db.delete(machine)
    db.commit()
    
    return {"detail": "Máquina eliminada correctamente"}
