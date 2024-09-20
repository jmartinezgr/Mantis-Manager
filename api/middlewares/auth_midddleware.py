'''
    Se define un Middleware para verificar el token de acceso.
    Esto nos permite interceptar las solicitudes HTTP y verificar 
    si el token de acceso es válido.
'''

from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
from services.jwt_services import verify_access_token

class AuthMiddleware(BaseHTTPMiddleware):
    """Middleware para verificar el token de acceso."""
    
    async def dispatch(self, request: Request, call_next):
        """Verifica el token de acceso."""
        
        # Lista de rutas públicas que no requieren autenticación
        public_routes = ["/token/refresh", "/login", "/register", "/docs", "/openapi.json", "/"]  
        
        # Verificar si la ruta actual está en la lista de rutas públicas
        if request.url.path in public_routes:
            return await call_next(request)
        
        # Obtener el token del encabezado Authorization
        auth_header = request.headers.get("Authorization")
    
        if auth_header is None or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=403, 
                content={
                    "detail": "Hace falta Bearer token  o tiene un formato incorrecto",
                    "code": "auth/missing_token"
                }
            )
        
        # Extraer el token quitando el prefijo 'Bearer '
        token = auth_header[len("Bearer "):]
        
        try:
            payload = verify_access_token(token)
            request.state.user = payload
        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code,
                content={"detail": e.detail} 
            )
        except Exception as e:
            return JSONResponse(
                status_code=403,
                content={"detail": str(e)}
            )
        
        # Continuar con la solicitud si el token es válido
        return await call_next(request)
