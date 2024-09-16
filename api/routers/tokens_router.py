from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer

from services.jwt_services import create_acess_token, create_refresh_token, verify_refresh_token

# Definir el esquema de seguridad Bearer Token
bearer_scheme = HTTPBearer()

tokens_router = APIRouter(tags=["Tokens"])

# Ruta protegida con token
@tokens_router.post("/token/refresh")
async def refresh_token(req: Request, dependencies=Depends(bearer_scheme)):
    """
    Renovar un token de acceso con un token de refresco.
    
    Este endpoint permite a un usuario sin autenticar renovar un token de acceso con un token de refresco.
    Esto se logra verificando el token de refresco y generando un nuevo token de acceso y refresco.

    Parámetros:
    - req: Solicitud HTTP con el token de refresco en el encabezado de autorización.
    - dependencies: Dependencia de autenticación con token

    Retorna:
    - Mensaje de éxito y los nuevos tokens de acceso y refresco.
    """
    
    try:
        # Obtiene el refresh token del encabezado de autorización
        refresh_token = req.headers.get("Authorization").split(" ")[1]
        
        # Verifica el refresh token
        payload = verify_refresh_token(refresh_token)
        
        # Crea un nuevo token de acceso y refresh token
        new_access_token = create_acess_token(data={"sub": payload["sub"], "scopes": payload["scopes"]})
        new_refresh_token = create_refresh_token(data={"sub": payload["sub"], "scopes": payload["scopes"]})
        
        return JSONResponse(status_code=200, content={
            "access_token": new_access_token,
            "refresh_token": new_refresh_token
        })
    
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content=e.detail)