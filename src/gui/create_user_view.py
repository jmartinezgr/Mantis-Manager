from users.create_user import*
jefe=Jefe_Desarrollo()
lista_datos=[]
print("Hola")

def imprimirMenu(): 
    print("\nCreacion usuario")
    print("1. Crear usuario Operario Maquinaria")
    print("2. Crear usuario Empleado Mantenimiento")
    print("3. Crear usuario Personal Empresa")
    n=int(input(" "))
    return n

def menu_informacion(): 
    print("\nMenu_Informacion")
    print("1. Nombre") 
    print("2. Id")


def formulario_informacion(): 
    menu_informacion()
    for i in range(2):
        n=(input(str(i+1)+".  "))
        lista_datos.append(n)

def create_user_interface():
    jefe=Jefe_Desarrollo()
    n=imprimirMenu()
    rol=jefe.asignar_rol(n)
    if n==1 or n==2 or n==3: 
        formulario_informacion()
        jefe.crear_usuario(lista_datos[0],lista_datos[1],rol)
        print("Criterios de Contraseña: \n(---4<= caracteres <=8---)\n (--Almenos una mayuscula---)\n(---Alemenos una minuscula---)\n(---Almentos un numero---)")

