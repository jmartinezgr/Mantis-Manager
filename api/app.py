from fastapi import FastAPI

from middlewares.auth_midddleware import AuthMiddleware
from routers.user_auth_router import user_auth_router
from routers.tokens_router import tokens_router

# Crear la instancia principal de FastAPI
app = FastAPI(
    title="MANTIS MANAGER API",
    description="Servicios para la gestión de mantenimiento de Balalika S.A",
    version="0.2"
)

# Agregar el middleware de autenticación
app.add_middleware(AuthMiddleware)
app.include_router(user_auth_router)
app.include_router(tokens_router)   