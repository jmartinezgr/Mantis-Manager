"""
Middleware para verificar el token de acceso.

Este middleware intercepta las solicitudes HTTP y verifica 
si el token de acceso es válido.
"""

from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
from services.jwt_services import verify_access_token


class AuthMiddleware(BaseHTTPMiddleware):
    """Middleware para verificar el token de acceso."""

    async def dispatch(self, request: Request, call_next):
        """
        Verifica el token de acceso en las solicitudes que no son públicas.

        Args:
            request (Request): La solicitud HTTP que llega al servidor.
            call_next (function): Función que llama al siguiente middleware o endpoint.

        Returns:
            Response: La respuesta HTTP, ya sea el resultado de `call_next` o un error.
        """

        # Rutas públicas que no requieren autenticación
        public_routes = [
            "/token/refresh", "/login", "/register", "/docs", 
            "/openapi.json", "/"
        ]

        # Verificar si la ruta actual es pública
        if request.url.path in public_routes:
            return await call_next(request)

        # Obtener el token del encabezado Authorization
        auth_header = request.headers.get("Authorization")

        if auth_header is None or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=403,
                content={
                    "detail": "Hace falta Bearer token o tiene un formato incorrecto",
                    "code": "auth/missing_token"
                }
            )

        # Extraer el token quitando el prefijo 'Bearer '
        token = auth_header[len("Bearer "):]

        try:
            # Verificar el token
            payload = verify_access_token(token)
            request.state.user = payload

            # Verificar permisos para la ruta de 'jefe_desarrollo'
            if request.url.path.startswith("/jefe_desarrollo") and payload.get("scopes") != 1:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="No tienes permisos para acceder a esta ruta"
                )

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