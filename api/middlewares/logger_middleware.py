import logging
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    filename="app.log"
)

logger = logging.getLogger("API")

# Middleware personalizado para registrar las solicitudes y respuestas
class LogRequestsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        client_port = request.client.port
        method = request.method
        url = request.url.path
        http_version = request.scope.get("http_version", "1.1")
        type = request.scope['type']
        
        
        response = await call_next(request)
        
        # Captura del código de estado de la respuesta
        status_code = response.status_code
        status_message = "OK" if status_code == 200 else "Not Found" if status_code == 404 else "Forbidden" if status_code == 403 else "Unknown"
        
        # Registro de la solicitud y respuesta
        logger.info(f'{client_ip}:{client_port} - "{method} {url} {type}/{http_version}" {status_code} {status_message}')
        
        return response