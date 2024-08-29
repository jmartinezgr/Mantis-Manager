import sqlite3
import os

class Connection:
    _DATABASE_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "mantis.db")
    _DATABASE = 'CRUDINFO'
    _USERNAME = 'root'
    _PASSWORD = ''
    _DB_PORT = None
    _HOST = ''
    _connection = None

    "Definiremos metodos de obtencion de cursor y conexion con sqlite3 pero luego usaremos los metodos para bbdd mas robustas"
    
    @classmethod
    def get_connection(cls):
        if cls._connection is None:
            try:
                cls._connection = sqlite3.connect(cls._DATABASE)
                return cls._connection
            except Exception as e:
                print(f"An error occurred while obtaining the database connection: {e}")
        else:
            return cls._connection
        
    @classmethod
    def get_cursor(cls):
        connection = cls.get_connection()
        return connection.cursor()
   
    
    
    
    """
    @classmethod
    def get_connection(cls):
        if cls._connection is None:
            try:
                cls._connection = pymysql.connect(
                    host=cls._HOST,
                    user=cls._USERNAME,
                    password=cls._PASSWORD,
                    port=cls._DB_PORT,
                    database=cls._DATABASE
                )
                return cls._connection
            except Exception as e:
                print(f"An error occurred while obtaining the database connection: {e}")
        else:
            return cls._connection
        
    @classmethod
    def get_cursor(cls):
        connection = cls.get_connection()
        return connection.cursor()
    """
if __name__ == "__main__":
    connection = Connection.get_connection()
    cursor = Connection.get_cursor()
    print("Conexion y cursor establecidos correctamente.")
