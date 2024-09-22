from fastapi import WebSocket, WebSocketDisconnect, APIRouter 
from services.web_socket_service import ConnectionManager
import json

ws_router = APIRouter()

@ws_router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await ConnectionManager.connect(websocket,user_id=user_id)
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Mensaje recibido: {json.dumps(data)}")
            await ConnectionManager.send_message(json.dumps(data), user_id=user_id)
    except WebSocketDisconnect:
        ConnectionManager.disconnect(websocket, user_id=user_id)