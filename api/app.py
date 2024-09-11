from fastapi import FastAPI
from middlewares.auth import AuthMiddleware

app = FastAPI()

app.middleware(
    AuthMiddleware,
    dispatch=AuthMiddleware.dispatch
)