from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from config.db import Base, engine

class User(Base):
    __tablename__ = 'user'
    id = Column(String, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey('role.id'))
    role = relationship("Role", back_populates="user")
    
    def verify_password(self, password):
        return self.password == password
    
class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    user = relationship("User", back_populates="role")
    
Base.metadata.create_all(bind=engine)