from typing import Dict, List
from fastapi import WebSocket
import json
from config.db import get_db
from models.notification_model import Notification
from datetime import datetime

class ConnectionManager:
    active_connections: Dict[int, List[WebSocket]] = {}

    @classmethod
    async def connect(cls, websocket: WebSocket, user_id: int):
        await websocket.accept()
        if user_id not in cls.active_connections:
            cls.active_connections[user_id] = []
        cls.active_connections[user_id].append(websocket)

    @classmethod
    def disconnect(cls, websocket: WebSocket, user_id: int):
        if user_id in cls.active_connections:
            cls.active_connections[user_id].remove(websocket)
            if not cls.active_connections[user_id]:
                del cls.active_connections[user_id]

    @classmethod
    async def send_message(cls, message, user_id: int):
        if user_id in cls.active_connections:
            if isinstance(message, str):
                try:
                    message = json.loads(message)
                except json.JSONDecodeError:
                    json_message = json.dumps({"type": "message/standar", "message": message})
                else:
                    json_message = json.dumps(message)
            elif isinstance(message, dict):
                json_message = json.dumps(message)
            else:
                return 1
            
            for connection in cls.active_connections[user_id]:
                await connection.send_text(json_message)
        else:
            # Si no hay conexiones activas, agregar a las notificaciones
            NotificationManager.add_notification(user_id, message)

class NotificationManager:
    @staticmethod
    async def get_pending_messages(user_id: int):
        session = next(get_db())
        try:
            data = session.query(Notification).filter(
                Notification.user_id == user_id,
                Notification.sent_by_app.is_(False)
            ).all()
            
            session.query(Notification).filter(
                    Notification.user_id == user_id,
                    Notification.sent_by_app.is_(False)
                ).update({"sent_by_app": True})
            session.commit()
            
            notifications = [notification.message for notification in data]

            return notifications
        finally:
            session.close()

    @staticmethod
    def add_notification(user_id: int, message: str):
        session = next(get_db())
        try:
            if isinstance(message, dict):
                message = json.dumps(message)
            new_notification = Notification(
                user_id=user_id,
                message=message,
                sent_by_app=False,
                created_at=datetime.utcnow()
            )
            session.add(new_notification)
            session.commit()
        except Exception as e:
            session.rollback()
            print(f"Error al agregar notificación: {e}")
        finally:
            session.close()
