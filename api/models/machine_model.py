from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from config.db import Base

class Machine(Base):
    """
    Modelo que representa una máquina en el sistema.

    Atributos:
        id (int): Identificador único de la máquina. Es autoincremental, único 
            y no nulo.
        type (str): Tipo de la máquina. No puede ser nulo.
        brand (str): Marca de la máquina. No puede ser nulo.
        serial (str): Número de serie único de la máquina. No puede ser nulo y 
            debe ser único.
        action (str): Acción asociada a la máquina (puede ser el estado o algún 
            atributo relevante).
        tickets (relationship): Relación uno a muchos con la entidad Ticket.
    """

    __tablename__ = 'machine'

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True, nullable=False)
    type = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    serial = Column(String, unique=True, nullable=False)
    action = Column(String, nullable=False)

    # Relación uno a muchos con Ticket
    tickets = relationship("Ticket", back_populates="machine")