import os
import csv


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
        # Obtener la ruta absoluta del archivo tickets.csv
        file_path = os.path.abspath("src/tickets/tickets.csv")
        self.contador += 1

        # Abrir el archivo en modo de apendizaje
        with open(file_path, "a", newline='') as file:
            writer = csv.writer(file)
            writer.writerow([self.id,self.title, self.description,self.estatus, self.reporter])  # Escribir los datos del ticket

        print("Ticket creado con exito!")
        print("Problema:", self.title)
        print("Descripcion:", self.description)
        print("Reportado por:", self.reporter)

ticket = ReportTicket("Error en la pagina", "La pagina no carga", "Juan")
