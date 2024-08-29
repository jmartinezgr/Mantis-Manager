import os
import csv
import os
import pandas as pd

class ReportTicket:
    def __init__(self, title, description, reporter):
        self.title = title
        self.description = description
        self.estatus = "Pendiente"
        self.reporter = reporter
        self.id = self.get_next_id()
        self.create()

    def get_next_id(self):
        # Obtener la ruta absoluta del archivo tickets.csv
        file_path = os.path.abspath("src/tickets/tickets.csv")

        # Verificar si el archivo existe
        if os.path.exists(file_path):
            # Leer el archivo y obtener el último ID
            with open(file_path, "r") as file:
                reader = pd.read_csv(file)
            return reader["id"].max() + 1
        else:
            return 1

    def create(self):
        # Obtener la ruta absoluta del archivo tickets.csv
        file_path = os.path.abspath("src/tickets/tickets.csv")

        # Abrir el archivo en modo de apendizaje
        with open(file_path, "a", newline='') as file:
            writer = csv.writer(file)
            writer.writerow([self.id, self.title, self.description, self.estatus, self.reporter])  # Escribir los datos del ticket

        print("Ticket creado con éxito!")
        print("Problema:", self.title)
        print("Descripción:", self.description)
        print("Reportado por:", self.reporter)
        print("El número de ticket es:", self.id)

ReportTicket("Error en la página", "La página no carga", "Juan")
ReportTicket("Error en el servidor", "El servidor no responde", "Pedro")
