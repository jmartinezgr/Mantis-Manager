from fastapi import FastAPI, Request, Depends
from fastapi.security import HTTPBearer
from middlewares.auth_midddleware import AuthMiddleware

app = FastAPI(
    title="MANTIS MANAGER API",
    description="Servicios para la gestión de mantenimiento de Balalika S.A",
    version="0.1"
)
app.add_middleware(AuthMiddleware)

# Definir el esquema de seguridad Bearer Token
bearer_scheme = HTTPBearer()

# Rutas de ejemplo
@app.get("/protected")
async def protected_route(req: Request, dependencies=Depends(bearer_scheme)):
    payload = req.state.user
    return {
        "message": f"Accediste a una ruta protegida con el token",
        "user": payload
    }

@app.get("/login")
async def login():
    return {"message": "Ruta pública: login"}

@app.get("/register")
async def register():
    return {"message": "Ruta pública: register"}    