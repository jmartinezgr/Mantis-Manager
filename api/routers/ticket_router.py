from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from config.db import get_db
from models.ticket_model import Ticket
from schemas.ticket_schema import TicketCreate, TicketUpdate, TicketData

# Crear un router para los tickets
ticket_router = APIRouter(tags=["Tickets"])

# Crear un ticket (POST)
@ticket_router.post("/tickets", response_model=TicketData)
async def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo ticket con el estado predeterminado 'pendiente'.
    
    Parámetros:
    - ticket: Los datos del ticket a crear.
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Datos del ticket creado.
    """
    new_ticket = Ticket(
        description=ticket.description,
        state="pendiente",  # Estado predeterminado a 'pendiente'
        machine_id=ticket.machine_id,
        created_by=ticket.created_by,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at  # Asignado si ya está en el ticket
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    
    return new_ticket


# Obtener todos los tickets (GET)
@ticket_router.get("/tickets", response_model=list[TicketData])
async def get_all_tickets(db: Session = Depends(get_db)):
    """
    Obtiene todos los tickets.
    
    Retorna:
    - Lista de todos los tickets.
    """
    tickets = db.query(Ticket).all()
    return tickets

# Obtener un ticket por ID (GET)
@ticket_router.get("/tickets/{ticket_id}", response_model=TicketData)
async def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un ticket por su ID.
    
    Parámetros:
    - ticket_id: ID del ticket a buscar.
    
    Retorna:
    - Datos del ticket encontrado.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    return ticket

# Actualizar un ticket (PUT)
@ticket_router.put("/tickets/{ticket_id}", response_model=TicketData)
async def update_ticket(ticket_id: int, ticket_data: TicketUpdate, db: Session = Depends(get_db)):
    """
    Actualiza un ticket existente.
    
    Parámetros:
    - ticket_id: ID del ticket a actualizar.
    - ticket_data: Nuevos datos para actualizar el ticket.
    
    Retorna:
    - Datos del ticket actualizado.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    # Actualizar los campos
    for key, value in ticket_data.dict(exclude_unset=True).items():
        setattr(ticket, key, value)
    
    db.commit()
    db.refresh(ticket)
    
    return ticket

# Eliminar un ticket (DELETE)
@ticket_router.delete("/tickets/{ticket_id}", response_model=dict)
async def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    """
    Elimina un ticket por su ID.
    
    Parámetros:
    - ticket_id: ID del ticket a eliminar.
    
    Retorna:
    - Mensaje de confirmación de eliminación.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    db.delete(ticket)
    db.commit()
    
    return {"detail": "Ticket eliminado correctamente"}
