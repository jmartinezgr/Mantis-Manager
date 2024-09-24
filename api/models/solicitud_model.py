from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from config.db import Base

class Solicitud(Base):
    __tablename__ = 'solicitud'
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    description = Column(String, nullable=False)

    # Relación con la tabla Ticket
    ticket_id = Column(Integer, ForeignKey('ticket.id'), nullable=False)
    ticket = relationship("Ticket", back_populates="solicitud")

    # Cambiamos el tipo de campo de Enum a String
    status = Column(String, default='pendiente', nullable=False)

    # Nuevo campo para definir si es solicitud de apertura o cierre, también en String
    type = Column(String, nullable=False)
