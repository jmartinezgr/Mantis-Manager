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
     
def init_roles():
    # La importación de Role ocurre aquí dentro de la función, para evitar la importación circular
    from models.user_model import Role, User
    from passlib.context import CryptContext
    session = SessionLocal()
    try:
        roles = ["Jefe de Desarrollo", "Operario de Mantenimiento", "Operario de Maquinaria", "Jefe de Mantenimiento"]
        for role_name in roles:
            existing_role = session.query(Role).filter_by(name=role_name).first()
            if not existing_role:
                new_role = Role(name=role_name)
                session.add(new_role)
                
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")        
                
        hashed_password = pwd_context.hash('admin')        
                
        new_user = User(
            id='admin',
            password=hashed_password,
            first_name='Admin',
            last_name='User',
            email='admin@mantis.com',
            phone='1234567890',
            role_id=1  # Asegúrate de asignar el rol de jefe de desarrollo
        )
        session.add(new_user)
            
        session.commit()
    except Exception as e:
        print(f"Error al inicializar roles: {e}")
        session.rollback()
    finally:
        session.close()


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
                for row in rows:
                    print(row)
            else:
                print("Conexión exitosa, pero no se encontraron datos en la tabla.")
    except Exception as e:
        print(f"Error al conectar: {e}")