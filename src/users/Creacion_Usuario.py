#com
import re
import bcrypt
import sqlite3

class Personal_Empresa: 
    def __init__(self): 
        self.__nombre=None
        self.__id=None 
        self.__fecha_vinculacion=None
        self.__contrasena=None
        self.__rol=None
        self.__direccion=None
        self.__email=None
        self.__telefono=None


    def getNombre(self):
        return self.__nombre
    
    def setNombre(self, nombre): 
        self.__nombre=nombre
    
    def getId(self):
        return self.__id 
    
    def setId(self,id): 
        self.__id=id
    
    def getFechavinculacion(self): 
        return self.__fecha_vinculacion
    
    def setFechavinculacion(self,fecha): 
        self.__fehca_vinculacion=fecha
    
    def getContrasena(self): 
        return self.__contrasena
    
    def setContrasena(self,contrasena):
        self.__contrasena=contrasena

        

    def getRol(self): 
        return self.__rol
    
    def setRol(self,rol):
        self.__rol=rol

    def getDireccion(self): 
        return self.__direccion

    def setDireccion(self,direccion): 
        self.__direccion=direccion
    
    def getEmail(self):
        return self.__email()
    
    def setEmail(self,email):
        self.__email=email
    
    def getTelefono(self): 
        return self.__telefono
    
    def setTelefono(self,telefono):
        self.__telefono=telefono


 
class Jefe_Desarrollo(Personal_Empresa): 
    indice=0   #Indice de Usuarios existentes en la lista (usuarios)
    
    def __init__(self): 
        self.__usuarios=[]
        super().__init__()

    def crear_usuario(self,id, rol): 
        """Agrega un nuevo usuario a la lista."""
        clase=self.asignar_rol(rol)   #Identifica el rol del nuevo usuario
        #Crea usario de acuerdo a rol
        if (clase.lower()=="operario de maquina"): 
            nuevo_usuario=Operario_Maquinaria()   
            nuevo_usuario.setId(id)
            nuevo_usuario.setRol(self.asignar_rol(rol))
            self.__usuarios.append(nuevo_usuario)
        elif (clase.lower()=="empleado de mantenimiento"): 
            nuevo_usuario=Empleado_Mantenimiento()
            nuevo_usuario.setId(id)
            nuevo_usuario.setRol(rol)
            self.__usuarios.append(nuevo_usuario)
        else: 
            nuevo_usuario = Personal_Empresa()  
        
        #Crear contraseña
        txt=input("Ingrese contraseña: ")
        pwd=Contrasena(txt)
        contrasena=pwd.guardar_contrasena(nuevo_usuario)
        encript=pwd.encriptar_contrasena()
        
        self.listar_usuario(nuevo_usuario,contrasena,encript)
        print("Usuario {} agregado exitosamente con el rol de {}.".format(nuevo_usuario.getId(),nuevo_usuario.getRol()))   
    
    
    def buscar_usuario(self, id):
        """Busca un usuario por Id."""
        for usuario in self.__usuarios:
            if usuario.getId() == id:
                return usuario
        print("Usuario '{}' no encontrado.".format(id))
        return False
    
    def eliminar_usuario(self,id): 
        """Elimina un usuario por Id."""
        if (self.buscar_usuario(id).getId()==id):
            usuario=self.buscar_usuario(id)
            self.__usuarios.remove(usuario)
            print("Usuario {} eliminado exitosamente.".format(usuario.getId()))
            return usuario.getId()
        print("Usuario '{}' no encontrado.".format(id))


    def listar_usuario(self,usuario,contrasena,encript): 
        """Guarda usuario en usuarios.txt."""

        miConexion=sqlite3.connect("mantis")
        miCursor=miConexion.cursor()
        miConexion.close()
        
        archivo=open("usuarios.txt","a")
        archivo.write(str(usuario.getId())+" - "+usuario.getRol()+" - " +contrasena+" - "+str(encript))
        archivo.close()

    
    def modificar_usuario(self): 
        pass
        
    def asignar_rol(self,rol): 
        """Realiza identificacion de rol"""

        rol=rol.lower()
        if rol not in ['operario de maquina', 'empleado de mantenimiento']:
            return "personal empresa"
        else: 
            return rol
    
    def reasignar_rol(self): 
        pass
    
    def verificar_usuario(self): 
        pass

    def cargar_usuarios(self):
        pass

    def restablecer_contraseña(self): 
        pass

    def notificar_usuario(self): 
        pass

class Operario_Maquinaria(Personal_Empresa): 
    def __init__(self):
        self.__horario=None
        self.__maquinas_asignadas=None
        self.__horario=None 
        super().__init__()        
    def getHorario(self): 
        return self.__horario()
    
    def setHorario(self,horario):
        self.__horario=horario
    
    def  getMaquinas(self): 
        return self.__maquinas_asignadas

    def setMaquinas(self,maquinas): 
        self.__maquinas_asignadas=maquinas
    
    def asignar_maquina(self): 
        pass
    
    def actualizar_horario(self):
        pass
    
class Empleado_Mantenimiento(Personal_Empresa): 
    def __init__(self): 
        self.__especialidad=None
        self.__certficados=[]
        self.__horario=None
        super.__init__(self) 

        
    
    def anadir_certificacion(self,certificdo): 
        self.__certficados.append(certificdo)

    def cambiar_especialidad(self): 
        pass

    def actualizar_horario(self): 
        pass


class Contrasena:
    criterios = []  # Lista de criterios no completados

    def __init__(self, contrasena):
        """Constructor que inicializa la contraseña."""
        self.__contrasena = contrasena

    def verifica_contrasena(self):
        """Verifica que la contraseña contenga: (4-8 caracteres entre los cuales: Mayúsculas, Minúsculas y Números)"""
        # Lista de los caracteres de la contraseña 
        longitud_valida = 4 <= len(self.__contrasena) <= 8
        
        # Acumulador de requisitos no cumplidos
        acumulador = 0

        if not longitud_valida:  # Verifica tamaño de contraseña incorrecto
            acumulador += 1
            self.criterios_faltantes("Tamaño")
        
        if not any(caracter.isupper() for caracter in self.__contrasena):  # Verifica si no hay mayúsculas
            acumulador += 1
            self.criterios_faltantes("Mayúsculas")
        
        if not any(caracter.islower() for caracter in self.__contrasena):  # Verifica si no hay minúsculas
            acumulador += 1
            self.criterios_faltantes("Minúsculas")

        if not any(caracter.isdigit() for caracter in self.__contrasena):  # Verifica si no hay números
            acumulador += 1
            self.criterios_faltantes("Números")
        
        return acumulador == 0  # Devuelve True si todos los criterios están cumplidos, False de lo contrario


    def criterios_faltantes(self, criterio):
        """Agrega a una lista (atributo de clase) los criterios faltantes de la contraseña"""
        if criterio not in Contrasena.criterios:  # Evita agregar duplicados
            Contrasena.criterios.append(criterio)

    def guardar_contrasena(self,usuario):
        """Guarda contraseña si y solo si la contraseña es válida. De lo contrario vuelve a pedir contraseña""" 
        while True:
            if self.verifica_contrasena(): 
                print("Contraseña guardada exitosamente.")
                usuario.setContrasena(self.__contrasena)
                return self.__contrasena
        

                break
            else: 
                print("Tu contraseña no cumple los siguientes requisitos: {}".format(Contrasena.criterios))
                self.__contrasena = input("INGRESA OTRA CONTRASEÑA: ")
                Contrasena.criterios.clear()  # Limpiar criterios después de un intento fallido

    def encriptar_contrasena(self): 
        txt=self.__contrasena
        pwd=txt.encode("utf-8")
        sal=bcrypt.gensalt()
        encript=bcrypt.hashpw(pwd,sal)
        return encript
            
#Caso de uso
"""jefe=Jefe_Desarrollo()
jefe.crear_usuario(123,"operario de maquina")"""