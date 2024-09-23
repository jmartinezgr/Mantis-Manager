from fastapi import WebSocket, WebSocketDisconnect, APIRouter 
from services.web_socket_service import ConnectionManager, NotificationManager

ws_router = APIRouter()

@ws_router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await ConnectionManager.connect(websocket, user_id)
    print(f"Connected to user {user_id}")
    try:
        while True:
            open_message = await websocket.receive_text()
            if open_message == 'open':
                data = await NotificationManager.get_pending_messages(user_id)
                print(data)
                if data:
                    for message in data:
                        await ConnectionManager.send_message(message, user_id)
    except WebSocketDisconnect:
        print(f"Disconnected from user {user_id}")
        ConnectionManager.disconnect(websocket, user_id)
    except Exception as e:
        print(f"Error occurred: {e}")
        await websocket.close()  # Asegúrate de cerrar el websocket en caso de error

