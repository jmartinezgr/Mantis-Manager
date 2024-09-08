from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependencia para obtener la sesión en los endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()