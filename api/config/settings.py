from dotenv import load_dotenv
import os

# Cargar las variables del archivo .env
load_dotenv()



def get_database_url():
    base_dir = os.getenv('DATABASE_URL', 'test.db')

    if base_dir == 'test.db':
    # Construye la URL de la base de datos    
        ruta = os.path.join('test.db')
        if not os.path.exists(ruta):
            ruta = os.path.join('./api/config', 'test.db')

        database_url = f"sqlite:///{ruta.replace('\\', '/')}"

        return database_url
    else:
        return base_dir