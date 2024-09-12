from fastapi import FastAPI, Request, Depends
from fastapi.security import HTTPBearer
from fastapi.responses import JSONResponse
from middlewares.auth_midddleware import AuthMiddleware
from schemas.auth_schema import LoginData
from config.db import get_db
from models.user_model import User
from sqlalchemy.orm import Session

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
async def login(data: LoginData, db: Session = Depends(get_db)):
    
    user = db.query(User).filter(User.username == data.username).first()

    if not user or not user.verify_password(data.password):
        raise JSONResponse(status_code=400, detail="Credenciales incorrectas")

    user_data = {
        "id": user.id,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "phone": user.phone,
        "role_id": user.role_id
    }

    return JSONResponse(status_code=200 ,content={
        "message": "Te has logueado correctamente",
        "data" : user_data
    })
    
@app.get("/register")
async def register():
    return {"message": "Ruta pública: register"}    