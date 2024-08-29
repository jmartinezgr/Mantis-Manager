import os
import subprocess
import sys 
import sqlite3

# Ruta de la base de datos (ajústala según tu estructura)
data_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data")
db_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "mantis.db")

if not os.path.exists(data_path) or not os.path.isfile(db_path):
    print(f"No se encontró la base de datos. Creando base de datos...")

    # Ejecutar el script de creación de la base de datos
    script_path = os.path.join(os.path.dirname(__file__), "create_database.py")
    try:
        subprocess.call(["python", script_path])
    except Exception as e:
        print(f"Error al crear la base de datos: {e}")
        sys.exit(1)
        
# Ruta de la base de datos (ajústala según tu estructura)
db_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "mantis.db")

# Conectar a la base de datos
connection = sqlite3.connect(db_path)
cursor = connection.cursor()

# Crear tabla de usuarios
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        cedula TEXT UNIQUE NOT NULL,
        rol TEXT NOT NULL,
        correo TEXT UNIQUE NOT NULL,
        contrasena TEXT NOT NULL,
        telefono TEXT,
        direccion TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

# Crear tabla de tickets
cursor.execute('''
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        estado TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        id_creador INTEGER NOT NULL,
        id_encargado INTEGER,
        id_cierre_usuario INTEGER,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_cierre TIMESTAMP,
        FOREIGN KEY (id_creador) REFERENCES usuarios(id),
        FOREIGN KEY (id_encargado) REFERENCES usuarios(id),
        FOREIGN KEY (id_cierre_usuario) REFERENCES usuarios(id)
    )
''')

# Confirmar los cambios
connection.commit()

# Cerrar la conexión
connection.close()

print("Tablas 'usuarios' y 'tickets' creadas exitosamente en la base de datos.")