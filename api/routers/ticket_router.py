from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

import logging


from config.db import get_db
from models.ticket_model import Ticket
from models.machine_model import Machine 
from models.user_model import User, Role
from schemas.ticket_schema import TicketCreate, TicketUpdate, TicketData

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Crear un router para los tickets
ticket_router = APIRouter(tags=["Tickets"])

# Crear un ticket (POST)
@ticket_router.post("/tickets", response_model=TicketData)
async def create_ticket(request: Request, ticket: TicketCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo ticket con el estado predeterminado 'pendiente'.
    
    Parámetros:
    - ticket: Los datos del ticket a crear (TicketCreate).
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Datos del ticket creado.
    """
    # Verificar si la máquina con el serial proporcionado existe
    machine = db.query(Machine).filter(Machine.serial == ticket.machine).first()
    
    if not machine:
        raise HTTPException(status_code=400, detail="La máquina con el serial proporcionado no existe.")
    
    # Obtener el usuario autenticado desde el token (almacenado en request.state.user)
    user_info = request.state.user  # Extraemos el payload del token
    user_id = user_info.get("sub")  # Asegúrate de que el campo "sub" sea el ID del usuario
    
    # Crear el ticket si la máquina existe
    new_ticket = Ticket(
        description=ticket.description,
        state="pendiente",  # Estado predeterminado a 'pendiente'
        machine_id=machine.id,  # Asignamos el ID de la máquina existente
        created_by=user_id,  # Tomamos el user_id del token
        created_at=func.now()  # Se usa func.now() para el timestamp
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    
    # Devolver la respuesta usando TicketData
    return TicketData(
        id=new_ticket.id,
        description=new_ticket.description,
        state=new_ticket.state,
        machine_serial=machine.serial,  # Devolvemos el serial de la máquina
        created_by=new_ticket.created_by,
        assigned_to=new_ticket.assigned_to,
        created_at=new_ticket.created_at
    )


@ticket_router.get("/tickets/{ticket_id}", response_model=TicketData)
async def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
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
        machine_serial=ticket.machine.serial,  
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at
    )

# Actualizar un ticket (PATCH)
@ticket_router.patch("/tickets/{ticket_id}", response_model=TicketData)
async def update_ticket(ticket_id: int, ticket_update: TicketUpdate, db: Session = Depends(get_db)):
    """
    Actualiza un ticket por su ID.
    
    Parámetros:
    - ticket_id: ID del ticket a actualizar.
    - ticket_update: Los campos a actualizar (TicketUpdate).
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Datos del ticket actualizado.
    """
    # Buscar el ticket en la base de datos
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    # Actualizar la descripción si es proporcionada
    if ticket_update.description:
        ticket.description = ticket_update.description
    
    # Actualizar el estado si es proporcionado y válido
    if ticket_update.state:

        #si el ticket no esta asignado no se puede cambiar el estado a en progreso o finalizado
        if ticket_update.state in ["en progreso", "finalizado"] and not ticket.assigned_to:
            raise HTTPException(status_code=400, detail="El ticket debe estar asignado") 
  
        ticket.state = ticket_update.state
    
    # Actualizar el assigned_to 
    if ticket_update.assigned_to:
        employer = db.query(User).filter(User.email == ticket_update.assigned_to).first()
        if not employer:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        role = db.query(Role).filter(Role.id == employer.role_id).first()
        if role.name != "Operario de Mantenimiento":
            raise HTTPException(status_code=400, detail="El usuario no es un Operario de mantenimiento")
        
        if ticket.state == "pendiente":
            ticket.state = "asignado"
        ticket.assigned_to = employer.id
    
    
    # Registrar el valor de assigned_to antes de devolver la respuesta
    logger.info(f"El valor de 'assigned_to' es: {ticket.assigned_to}")

    db.commit()
    db.refresh(ticket)

    
    #ticket actualizado
    return TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        machine_serial=ticket.machine.serial,  
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at
    )

@ticket_router.get("/historial", response_model=List[TicketData])
async def get_finalized_tickets(db: Session = Depends(get_db)):
    """
    Obtiene el historial, con todos los tickets de estado "finalizado".
    
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
            machine_serial=ticket.machine.serial,  
            created_by=ticket.created_by,
            assigned_to=ticket.assigned_to,
            created_at=ticket.created_at
        )
        for ticket in tickets
    ]

@ticket_router.get("/seguimiento", response_model=List[TicketData])
async def get_my_tickets(request: Request, db: Session = Depends(get_db)):
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
            machine_serial=ticket.machine.serial,  
            created_by=ticket.created_by,
            assigned_to=ticket.assigned_to,
            created_at=ticket.created_at
        )
        for ticket in tickets
    ]
