class Ticket:
    id_counter = 0  # Contador de ID inicializado en 0

    def __init__(self, title, description, reporter, status="En cola"):
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
        self.id = self.generate_id()
        

    @classmethod
    def generate_id(cls):
        """
        Genera un ID secuencial único para el ticket.
        
        :return: ID único para el ticket
        """
        cls.id_counter += 1
        return cls.id_counter