from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

from config.db import get_db
from models.ticket_model import Ticket
from models.machine_model import Machine 
from schemas.ticket_schema import TicketCreate, TicketUpdate, TicketData

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
    machine = db.query(Machine).filter(Machine.serial == ticket.machine_id).first()
    
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
        created_by=user_id,
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

# Obtener todos los tickets (GET)
@ticket_router.get("/tickets", response_model=list[TicketData])
async def get_all_tickets(db: Session = Depends(get_db)):
    """
    Obtiene todos los tickets.
    
    Retorna:
    - Lista de todos los tickets.
    """
    tickets = db.query(Ticket).join(Ticket.machine).all()  # Usamos join para traer los datos de la máquina
    
    # Modificamos la respuesta para incluir el serial de la máquina
    ticket_response = [
        {
            "id": ticket.id,
            "description": ticket.description,
            "state": ticket.state,
            "machine_serial": ticket.machine.serial,  # Mostramos el serial de la máquina
            "created_by": ticket.created_by,
            "assigned_to": ticket.assigned_to,
            "created_at": ticket.created_at
        }
        for ticket in tickets
    ]
    
    return ticket_response

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
        machine_serial=ticket.machine.serial,  # Aseguramos incluir el serial de la máquina
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at
    )

