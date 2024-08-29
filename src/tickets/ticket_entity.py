class Ticket:
    id_counter = 0  # Contador de ID inicializado en 0

    def __init__(self, title, description, reporter, status="En cola", id=None, assigned_to=None, fecha_creacion=None, fecha_cierre=None):
        """
        Inicializa un nuevo ticket con la información proporcionada.

        :param title: Título del ticket
        :param description: Descripción del problema
        :param reporter: Persona que reporta el problema
        :param status: Estado del ticket (por defecto "Open")
        """
        self.title = title
        self.description = description
        self.reporter = reporter
        self.status = status
        self.assigned_to = assigned_to
        self.id = id
        self.fecha_creacion = fecha_creacion
        self.fecha_cierre = fecha_cierre
        

    @classmethod
    def generate_id(cls):
        """
        Genera un ID secuencial único para el ticket.
        
        :return: ID único para el ticket
        """
        cls.id_counter += 1
        return cls.id_counter
    
    
    def __str__(self):
        return (f"\nTicket ID: {self.id}\n"
                f"  Descripción: {self.description}\n"
                f"  Reportado por: {self.reporter}\n"
                f"  Estado: {self.status}\n"
                f"  Asignado a: {self.assigned_to if self.assigned_to else 'Nadie'}\n"
                f"  Fecha de creacion: {self.fecha_creacion if self.fecha_creacion else 'Sin definir'}\n"
                f"  Fecha de cierre: {self.fecha_cierre if self.fecha_cierre else 'Sin definir'}\n")
