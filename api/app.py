from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from middlewares.auth_midddleware import AuthMiddleware
from middlewares.logger_middleware import LogRequestsMiddleware
from apscheduler.schedulers.background import BackgroundScheduler

from routers.user_auth_router import user_auth_router
from routers.tokens_router import tokens_router
from routers.user_image_router import user_image_router
from routers.ticket_router import ticket_router
from routers.machine_router import machine_router

from models.create_tables import create_tables
from config.db import init_roles  

from config.db import get_db
from services.ticket_service import actualizar_prioridad_y_deadline



# Crear las tablas en la base de datos
create_tables()

# Crear la instancia principal de FastAPI
app = FastAPI(
    title="MANTIS MANAGER API",
    version="0.5"
)

# Agregar el middleware de autenticación
app.add_middleware(AuthMiddleware)
app.add_middleware(LogRequestsMiddleware)

# Agregar los routers
app.include_router(user_auth_router)
app.include_router(tokens_router)
app.include_router(user_image_router)
app.include_router(ticket_router)
app.include_router(machine_router)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scheduler = BackgroundScheduler()

def ejecutar_actualizacion():
    print("Se está ejecutando la actualización de prioridades y deadlines")
    try:
        db = next(get_db())
        print("Conexión a la base de datos obtenida")
        actualizar_prioridad_y_deadline(db)
    except Exception as e:
        print(f"Error en ejecutar_actualizacion: {e}")

scheduler.add_job(ejecutar_actualizacion, 'interval', seconds=20)
print(scheduler.get_jobs())  # Esto imprimirá una lista de los trabajos activos
scheduler.start()

@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()

# Inicializar roles
@app.on_event("startup")
def startup_event():
    init_roles()
