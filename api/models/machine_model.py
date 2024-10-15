from sqlalchemy import Column, String, Date
from sqlalchemy.orm import relationship
from config.db import Base

class Machine(Base):
    """
    Modelo que representa una máquina en el sistema.

    Atributos:
        id (str): Alias único de la máquina. Es un string de 3 caracteres 
            que será pasado por los usuarios, único y no nulo.
        type (str): Tipo de la máquina. No puede ser nulo.
        brand (str): Marca de la máquina. No puede ser nulo.
        model (str): Modelo de la máquina. No puede ser nulo.
        serial (str): Número de serie único de la máquina. No puede ser nulo y 
            debe ser único.
        description (str): Descripción general de la máquina.
        action (str): Acción asociada a la máquina (puede ser el estado o algún 
            atributo relevante).
        tickets (relationship): Relación uno a muchos con la entidad Ticket.
    """

    __tablename__ = 'machine'

    id = Column(String(3), primary_key=True, unique=True, nullable=False)  
    type = Column(String(50), nullable=False)
    brand = Column(String(50), nullable=False)
    model = Column(String(40), nullable=False)
    serial = Column(String(20), unique=True, nullable=False)
    description = Column(String(2000), nullable=True)
    action = Column(String(50), nullable=False)

    # Relación uno a muchos con Ticket
    tickets = relationship("Ticket", back_populates="machine")