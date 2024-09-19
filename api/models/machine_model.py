from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from config.db import Base, engine

class Machine(Base):
    __tablename__ = 'machine'
    id = Column(Integer,autoincrement=True, primary_key=True, unique=True, nullable=False)
    type = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    serial = Column(String, unique=True, nullable=False)
    action = Column(String, nullable=False)

    # Relación uno a muchos con Ticket
    tickets = relationship("Ticket", back_populates="machine")
    
