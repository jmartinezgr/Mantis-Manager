from sqlalchemy import Column, Integer, String, Boolean, DateTime

from datetime import datetime
from config.db import Base

class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)  # ID del usuario
    message = Column(String, nullable=False)  # Contenido de la notificación
    sent_by_app = Column(Boolean, default=False)  # Estado de envío por app
    sent_by_email = Column(Boolean, default=False)  # Estado de envío por correo
    created_at = Column(DateTime, default=datetime.utcnow())  # Fecha de creación