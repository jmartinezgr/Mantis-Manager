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
    new_request = Solicitud(**request.dict())
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request

# Obtener todas las solicitudes (GET)
@solicitud_router.get("/solicitudes", response_model=List[RequestData])
def get_requests( db: Session = Depends(get_db)):
    requests = db.query(Solicitud).all()
    return requests

# Obtener una solicitud por ID (GET)
@solicitud_router.get("/solicitudes/{solicitud_id}", response_model=RequestData)
def get_request(solicitud_id: int, db: Session = Depends(get_db)):
    request = db.query(Solicitud).filter(Solicitud.id == solicitud_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    return request

# Responder una solicitud (PATCH)
@solicitud_router.patch("/solicitudes/{solicitud_id}/responder", response_model=RequestData)
def respond_request(solicitud_id: int, response_data: RespondRequest, db: Session = Depends(get_db)):
    request = db.query(Solicitud).filter(Solicitud.id == solicitud_id).first()
    
    if not request:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    
    ticket = db.query(Ticket).filter(Ticket.id == request.ticket_id).first()
    
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
    new_request = Solicitud(**request.dict())
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request

# Obtener todas las solicitudes (GET)
@solicitud_router.get("/solicitudes", response_model=List[RequestData])
def get_requests( db: Session = Depends(get_db)):
    requests = db.query(Solicitud).all()
    return requests

# Obtener una solicitud por ID (GET)
@solicitud_router.get("/solicitudes/{solicitud_id}", response_model=RequestData)
def get_request(solicitud_id: int, db: Session = Depends(get_db)):
    request = db.query(Solicitud).filter(Solicitud.id == solicitud_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    return request

# Responder una solicitud (PATCH)
@solicitud_router.patch("/solicitudes/{solicitud_id}/responder", response_model=RequestData)
def respond_request(solicitud_id: int, response_data: RespondRequest, db: Session = Depends(get_db)):
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
