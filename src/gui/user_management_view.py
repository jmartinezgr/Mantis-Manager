from users.Creacion_Usuario import Jefe_Desarrollo, Personal_Empresa
def create_user():
    nombre = input("Nombre del usuario: ")
    id = input("Identificación del usuario: ")
    fecha_vinculacion = input("Fecha de vinculación: ")
    contrasena = input("Contraseña: ")
    rol = input("Rol: ")
    direccion = input("Dirección: ")
    email = input("Correo electrónico: ")
    telefono = input("Teléfono: ")
    jefe = Jefe_Desarrollo(nombre, id, fecha_vinculacion, contrasena, rol, direccion, email, telefono)
    return jefe