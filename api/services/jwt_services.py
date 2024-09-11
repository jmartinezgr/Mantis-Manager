import jwt 
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from config.settings import get_secret_key

SECRET_KEY = get_secret_key()
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = timedelta(minutes=10)

def create_acess_token(data: dict) -> str:
    # Crea un token de acceso con la información del usuario
    to_encode = data.copy()
    # Establece la fecha de expiración del token
    expire = datetime.now(tz = timezone.utc) + ACCESS_TOKEN_EXPIRE    
    # Agrega la fecha de expiración al token
    to_encode.update({"exp": expire})
    # Codifica el token
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

def verify_token(token: str) -> dict:
    # Verifica el token
    try:
        # Decodifica el token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  
    except jwt.ExpiredSignatureError:
        # Si el token ha expirado lanza una excepción HTTP 401
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        # Si el token es inválido lanza una excepción HTTP 401
        raise HTTPException(status_code=401, detail="Token inválido")   