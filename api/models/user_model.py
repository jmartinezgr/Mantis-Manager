from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from config.db import Base, engine
from passlib.context import CryptContext
from models.ticket_model import Ticket

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = 'user'
    id = Column(String, primary_key=True)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    image_field = Column(String, nullable=True, default=None)
    role_id = Column(Integer, ForeignKey('role.id'))
    role = relationship("Role", back_populates="user")
    
    # Relación uno a muchos con Ticket (tickets creados por este usuario)
    created_tickets = relationship("Ticket", foreign_keys=[Ticket.created_by], back_populates="creator")
    
    # Relación uno a muchos con Ticket (tickets asignados a este usuario)
    assigned_tickets = relationship("Ticket", foreign_keys=[Ticket.assigned_to], back_populates="assignee")
    
    def verify_password(self, password):
        return pwd_context.verify(password, self.password)
    
class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    user = relationship("User", back_populates="role")