from fastapi import FastAPI

from middlewares.auth_midddleware import AuthMiddleware
from middlewares.logger_middleware import LogRequestsMiddleware
from routers.user_auth_router import user_auth_router
from routers.tokens_router import tokens_router
from routers.user_image_router import user_image_router

# Crear la instancia principal de FastAPI
app = FastAPI(
    title="MANTIS MANAGER API",
    description="Servicios para la gestión de mantenimiento de Balalika S.A",
    version="0.2"
)

# Agregar el middleware de autenticación
app.add_middleware(AuthMiddleware)
app.add_middleware(LogRequestsMiddleware)

# Agregar los routers
app.include_router(user_auth_router)
app.include_router(tokens_router)   
app.include_router(user_image_router)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)