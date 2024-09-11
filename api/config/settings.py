from dotenv import load_dotenv
import os

# Cargar las variables del archivo .env
load_dotenv()
def get_database_url() -> str:
    # Obtiene la URL de la base de datos
    base_dir = os.getenv('DATABASE_URL', 'test.db')

    # Si la base de datos es de prueba
    if base_dir == 'test.db':
    # Construye la URL de la base de datos    
        ruta = os.path.join('test.db')
        if not os.path.exists(ruta):
            ruta = os.path.join('./api/config', 'test.db')

        database_url = f"sqlite:///{ruta.replace('\\', '/')}"
        return database_url
    else:
        # Si la base de datos es de producción
        return base_dir
    
def get_secret_key() -> str:
    return os.getenv('SECRET_KEY')