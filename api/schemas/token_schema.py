from pydantic import BaseModel

class TokenData(BaseModel):
    """Esquema para los datos de un token."""
    access_token: str
    refresh_token: str