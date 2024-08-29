import os
import sqlite3

# Construir la ruta dos niveles arriba y luego a la carpeta 'data'
db_directory = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data")
db_path = os.path.join(db_directory, "mantis.db")

# Crear la carpeta 'data' si no existe
os.makedirs(db_directory, exist_ok=True)

# Conectarse a la base de datos (esto creará el archivo si no existe)
connection = sqlite3.connect(db_path)

# Puedes agregar más lógica aquí para crear tablas, insertar datos, etc.

# Cerrar la conexión cuando hayas terminado
connection.close()

print(f"Base de datos creada en {db_path}")
