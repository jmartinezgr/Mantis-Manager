from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.solicitud_model import Solicitud
from models.ticket_model import Ticket
from schemas.solicitud_schema import RequestCreate, RequestData, RespondRequest  # Cambiado a 'solicitud_schema'
from config.db import get_db
from typing import List

# Crear un router para las solicitudes
solicitud_router = APIRouter(tags=["Solicitudes"])
    
# Crear una nueva solicitud (POST)
@solicitud_router.post("/solicitudes", response_model=RequestData)
def create_request(request: RequestCreate, db: Session = Depends(get_db)):
    """
    El Operario puede crear una solicitud de cierre o reapertura de ticket.
    
    Parámetros:
    - request: Datos de la solicitud a crear (description, type(cierre o apertura), ticket_id)
    - db: Sesión de la base de datos (dependencia).
    
    Retorna:
    - Datos de la solicitud creada.
    """
    # Establecer el estado de la solicitud como "pendiente" por defecto
    new_request = Solicitud(
        description=request.description,
        type=request.type,
        ticket_id=request.ticket_id,
        status="pendiente"  # pendiente hasta que el jefe de mantenimeinto acepte o rechace la solicitud
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request


# Obtener todas las solicitudes (GET)
@solicitud_router.get("/solicitudes", response_model=List[RequestData])
def get_requests( db: Session = Depends(get_db)):
    """
    El Jefe de Mantenimeinto puede revisar todas las solicitudes sin responder (pendientes).
    
    Parámetros:
    - db: Sesión de la base de datos (dependencia).
    
    Retorna:
    - Lista con todas las solicitudes de estado pendiente.
    """
    solicitudes = db.query(Solicitud).filter(Solicitud.status == "pendiente").all()

    return solicitudes

# Obtener una solicitud por ID (GET)
@solicitud_router.get("/solicitudes/{solicitud_id}", response_model=RequestData)
def get_request(solicitud_id: int, db: Session = Depends(get_db)):
    """
    Buscar una solicitud por su ID.
    
    Parámetros:
    - solicitud_id: ID de la solicitud a buscar.
    - db: Sesión de la base de datos (dependencia).
    
    Retorna:
    - Datos de la solicitud.
    """
    request = db.query(Solicitud).filter(Solicitud.id == solicitud_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    return request

# Responder una solicitud (PATCH)
@solicitud_router.patch("/solicitudes/{solicitud_id}/responder", response_model=RequestData)
def respond_request(solicitud_id: int, response_data: RespondRequest, db: Session = Depends(get_db)):
    """
    El jefe de Mantenimeinto puede responder una solicitud pendiente ya sea aprobandola o rechazandola,
    el estado del ticket cambiará dependiendo del tipo de solictud.
    
    Parámetros:
    - solicitud_id: ID de la solicitud a responder.
    - response_data: Datos de la respuesta (status: aceptada o rechazada).
    - db: Sesión de la base de datos (dependencia).
    
    Retorna:
    - Datos de la solicitud.
    """
    request = db.query(Solicitud).filter(Solicitud.id == solicitud_id).first()
    
    if not request:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    
    ticket = db.query(Ticket).filter(Ticket.id == request.ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket relacionado no encontrado")
    
    if response_data.status == "aceptada":
        if request.type == "cierre":
            ticket.state = "finalizado"
        elif request.type == "apertura":
            ticket.state = "asignado"
    
    request.status = response_data.status
    
    db.commit()
    db.refresh(ticket)
    db.refresh(request)
    
    return request

  