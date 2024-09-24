from datetime import timedelta, datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer
from config.db import get_db
from models.ticket_model import Ticket
from models.machine_model import Machine 
from models.user_model import User, Role
from schemas.ticket_schema import TicketCreate, TicketData, TicketAssign, TicketStateUpdate
from services.solicitud_service import create_solicitud

bearer_scheme = HTTPBearer()

# Crear un router para los tickets
ticket_router = APIRouter(tags=["Tickets"])

# Crear un ticket (POST)
@ticket_router.post("/tickets", response_model=TicketData)
async def create_ticket(request: Request, ticket: TicketCreate, db: Session = Depends(get_db),
    dependencies=Depends(bearer_scheme)):
    """
    Crea un nuevo ticket con el estado predeterminado 'pendiente'.
    
    Parámetros:
    - ticket: Los datos del ticket a crear (TicketCreate).
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Datos del ticket creado.
    """
    machine = db.query(Machine).filter(Machine.serial == ticket.machine).first()
    
    if not machine:
        raise HTTPException(status_code=400, detail="La máquina con el serial proporcionado no existe.")
    
    user_info = request.state.user  
    user_id = user_info.get("sub")  
    
    # Establecer el deadline basado en la prioridad
    if ticket.priority == 'baja':
        deadline = datetime.now() + timedelta(weeks=1) 
    elif ticket.priority == 'media':
        deadline = datetime.now() + timedelta(days=3) 
    elif ticket.priority == 'alta':
        deadline = datetime.now() + timedelta(days=1)
    else:
        raise HTTPException(status_code=400, detail="Prioridad no válida.")
    
    # Crear el ticket si la máquina existe
    new_ticket = Ticket(
        description=ticket.description,
        state="pendiente",  
        machine_id=machine.id,  
        priority=ticket.priority,
        created_by=user_id, 
        created_at=func.now(),  
        deadline=deadline
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    
    return TicketData(
        id=new_ticket.id,
        description=new_ticket.description,
        state=new_ticket.state,
        priority=new_ticket.priority,  
        machine_serial=machine.serial,  
        created_by=new_ticket.created_by,
        assigned_to=new_ticket.assigned_to,
        created_at=new_ticket.created_at,
        deadline=new_ticket.deadline 
    )

@ticket_router.get("/tickets/{ticket_id}", response_model=TicketData)
async def get_ticket(ticket_id: int, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene un ticket por su ID.
    
    Parámetros:
    - ticket_id: ID del ticket a buscar.
    
    Retorna:
    - Datos del ticket encontrado.
    """
    # Unimos el ticket con la máquina para obtener el serial
    ticket = db.query(Ticket).join(Ticket.machine).filter(Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    # Devolver la respuesta con el serial de la máquina
    return TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,  
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at,
        deadline=ticket.deadline
    )


@ticket_router.patch("/tickets/{ticket_id}/assign", response_model=TicketData)
async def assign_ticket(ticket_id: int, ticket_assign: TicketAssign, db: Session = Depends(get_db)):
    """
    Asigna un operario al ticket.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    employer = db.query(User).filter(User.id == ticket_assign.assigned_to).first()

    if not employer:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    role = db.query(Role).filter(Role.id == employer.role_id).first()

    if role.name != "Operario de Mantenimiento":
        raise HTTPException(status_code=400, detail="El usuario no es un Operario de Mantenimiento")

    if ticket.state == "pendiente":
        ticket.state = "asignado"

    ticket.assigned_to = employer.id
    db.commit()
    db.refresh(ticket)

    return TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at,
        deadline=ticket.deadline
    )

@ticket_router.patch("/tickets/{ticket_id}/state", response_model=TicketData)
async def change_ticket_state(ticket_id: int, ticket_update: TicketStateUpdate, db: Session = Depends(get_db)):
    """
    Cambia el estado de un ticket.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    if ticket_update.state not in ["asignado", "en proceso", "pendiente"]:
        raise HTTPException(status_code=400, detail="Estado no válido para cambio directo.")

    ticket.state = ticket_update.state
    db.commit()
    db.refresh(ticket)

    return TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at,
        deadline=ticket.deadline
    )

@ticket_router.get("/finalizado", response_model=List[TicketData])
async def get_finalized_tickets(db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene todos los tickets de estado "finalizado".
    
    Parámetros:
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Una lista de tickets con estado 'finalizado'.
    """
    # Consultar los tickets con estado "finalizado"
    tickets = db.query(Ticket).filter(Ticket.state == "finalizado").all()
    
    if not tickets:
        raise HTTPException(status_code=404, detail="No se encontraron tickets con estado 'finalizado'.")
    
    # Devolver los tickets filtrados
    return [
        TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,  
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at,
        deadline=ticket.deadline
        )
        for ticket in tickets
    ]

@ticket_router.get("/seguimiento", response_model=List[TicketData])
async def get_my_tickets(request: Request, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene todos los tickets creados por el usuario autenticado para 
    asi poder hacer un seguimiento a los tickets creados
    
    Parámetros:
    - request: Objeto de la solicitud que contiene el token con el ID del usuario.
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Una lista de tickets creados por el usuario autenticado.
    """
    # Extraer el ID del usuario autenticado desde el token
    user_info = request.state.user  
    user_id = user_info.get("sub")  
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Problema con la autenticacion de usuario.")
    
    # Consultar los tickets creados por el usuario autenticado
    tickets = db.query(Ticket).filter(Ticket.created_by == user_id).all()
    
    if not tickets:
        raise HTTPException(status_code=404, detail="No has creado ningún ticket.")
    
    # Devolver los tickets encontrados
    return [
        TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,  
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at,
        deadline=ticket.deadline
        )
        for ticket in tickets
    ]