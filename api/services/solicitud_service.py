from sqlalchemy.orm import Session
from models.solicitud_model import Solicitud

# Servicio para crear una nueva solicitud
def create_solicitud(ticket_id: int, tipo: str, descripcion: str, db: Session):
    nueva_solicitud = Solicitud(
        ticket_id=ticket_id,
        type=tipo,
        description=descripcion
    )
    db.add(nueva_solicitud)
    db.commit()
    db.refresh(nueva_solicitud)
    return nueva_solicitud
