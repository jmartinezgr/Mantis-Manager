import os

def get_database_url() -> str:
    # Obtiene la URL de la base de datos
    base_dir = os.getenv('MYSQL_URL')

    # Si la base de datos es de producción
    base_dir = base_dir.replace('mysql://', 'mysql+pymysql://')
    return base_dir
    
    
def get_secret_key() -> str:
    secret_key = os.getenv('SECRET_KEY')
    if not secret_key:
        raise ValueError("problema con el JWT.")
    return secret_key