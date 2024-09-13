from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .settings import get_database_url

engine = create_engine(
                    get_database_url(),  # URL de conexión
                    #echo=True
                    pool_size=10,  # Número de conexiones en el pool
                    max_overflow=20  # Número máximo de conexiones adicionales
                )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependencia para obtener la sesión en los endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
     
if __name__ == "__main__":    
    from sqlalchemy import text

    try:
        # Crear una sesión
        with SessionLocal() as session:
            # Ejecutar consulta en la tabla 'test'
            result = session.execute(text("SELECT * FROM test"))
            
            # Iterar sobre los resultados
            rows = result.fetchall()
            if rows:
                print("Conexión exitosa: Se encontraron datos en la tabla.")
                for row in rows:
                    print(row)
            else:
                print("Conexión exitosa, pero no se encontraron datos en la tabla.")
    except Exception as e:
        print(f"Error al conectar: {e}")