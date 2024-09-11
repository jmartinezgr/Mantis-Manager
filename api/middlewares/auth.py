'''
    Se define un Middleware para verificar el token de acceso.
    Esto nos permite interceptar las solicitudes HTTP y verificar 
    si el token de acceso es válido.
'''

from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from services.jwt_services import verify_access_token

class AuthMiddleware(BaseHTTPMiddleware):
    """Middleware para verificar el token de acceso."""
     
    async def dispatch(self, request: Request, call_next) -> None:
        """Verifica el token de acceso.

        Args:
            request (Request): Solicitud HTTP.
            call_next (_type_): Siguiente función a ejecutar.

        Raises:
            HTTPException: Si el token es inválido o ha expirado.
            e: Cualquier otra excepción.

        Returns:
            None: No retorna nada.
        """
        
        #Lista de rutas públicas que no requieren autenticación
        public_routes = ["/refresh", "/login", "/register"]  
        
        # Verificar si la ruta actual está en la lista de rutas públicas
        if request.url.path in public_routes:
            response = await call_next(request)
            return response
        
        token = request.headers.get('Authorization')
        if token is None:
            raise HTTPException(status_code=403, detail='Token is missing')
        
        try:
            payload = verify_access_token(token)
            request.state.user = payload
            
        except Exception as e:
            raise e
        
        return await call_next(request)