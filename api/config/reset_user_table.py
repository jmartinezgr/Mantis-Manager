from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
import os

ruta_db = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', 'test.db')

database_url = f"sqlite:///{ruta_db.replace('\\', '/')}"

# Crear conexión con la base de datos
engine = create_engine(database_url, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

with SessionLocal() as session:
    try:
        # Eliminar la tabla User si existe
        session.execute(text("DROP TABLE IF EXISTS solicitud"))
        session.commit()
        print("Tabla User eliminada.")
    except Exception as e:
        session.rollback()
        print(f"Error eliminando la tabla User: {e}")

# Recrear la tabla User
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Error recreando la tabla User: {e}")
