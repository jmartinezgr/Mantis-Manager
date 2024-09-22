from typing import Dict, List
from fastapi import WebSocket

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
    async def send_message(cls, message: str, user_id: int):
        if user_id in cls.active_connections:
            for connection in cls.active_connections[user_id]:
                await connection.send_text(message)
        else:
            print(f"No hay conexiones activas para el usuario con ID {user_id}")
