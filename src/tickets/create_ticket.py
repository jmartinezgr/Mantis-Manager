import os


class ReportTicket:
    def __init__(self, title, description, reporter):
        self.contador = 0
        self.title = title
        self.id = self.contador + 1
        self.description = description
        self.estatus = "Pendiente"
        self.reporter = reporter
        self.create()

    def create(self):
        # Obtener la ruta absoluta del archivo tickets.txt
        file_path = os.path.abspath("src/tickets/tickets.txt")
        self.contador += 1

        # Abrir el archivo en modo de apendizaje
        with open(file_path, "a") as file:
            # Escribir la información del ticket en el archivo
            file.write(f"Title: {self.title}\n")
            file.write(f"Description: {self.description}\n")
            file.write(f"Reporter: {self.reporter}\n")
            file.write("\n")  # Agregar una nueva línea después de cada ticket

        print("Ticket creado con exito!")
        print("Problema:", self.title)
        print("Descripcion:", self.description)
        print("Reportado por:", self.reporter)

ticket = ReportTicket("Error en la página", "La página no carga", "Juan")
