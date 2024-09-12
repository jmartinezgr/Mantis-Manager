from fastapi import FastAPI, Request, Depends
from fastapi.security import HTTPBearer
from fastapi.responses import JSONResponse
from middlewares.auth_midddleware import AuthMiddleware
from schemas.auth_schema import LoginData

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
    return JSONResponse(status_code=200 ,content={
        "message": f"Accediste a una ruta protegida con el token",
        "user": payload
    })

@app.post("/login")
async def login(data: LoginData):

    return JSONResponse(status_code=200 ,content={
        "message": "Ruta pública: login",
        "data" : dict(data)
    })
    
@app.get("/register")
async def register():
    return {"message": "Ruta pública: register"}    