import os

# Obtiene el directorio base donde se encuentra el script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Define la estructura de carpetas y archivos
structure = {
    "src": {
        "tickets": ["create_ticket.py", "update_ticket_status.py", "assign_ticket.py", "ticket_repository.py", "ticket_service.py"],
        "users": ["create_user.py", "update_user_role.py", "authenticate_user.py", "user_repository.py", "user_service.py"],
        "reports": ["generate_maintenance_report.py", "report_repository.py", "report_service.py"],
        "auth": ["login_service.py", "auth_repository.py", "token_generator.py"],
        "gui": ["main_window.py", "ticket_view.py", "user_management_view.py"],
        "common": ["entity_base.py", "value_object_base.py", "utilities.py"],
        "interfaces": ["i_ticket_repository.py", "i_user_repository.py", "i_report_repository.py", "i_auth_repository.py"],
        "infrastructure": ["mantis_db.py", "logging_service.py", "email_notification_service.py"]
    },
    "migrations": ["__init__.py", "migration_script.py", "001_initial_schema.py", "002_add_user_roles.py"],
    "tests": ["test_create_ticket.py", "test_update_ticket_status.py", "test_login_service.py"],
    "docs": ["architecture.md", "api_reference.md", "user_manual.md"],
    "config": ["settings.py", "logging.conf"],
    "scripts": ["run_migrations.py", "start_server.py"],
}

def create_structure(base_path, structure):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            # Crea la carpeta y su contenido de manera recursiva
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        elif isinstance(content, list):
            # Crea la carpeta y los archivos dentro de ella
            os.makedirs(path, exist_ok=True)
            for file_name in content:
                file_path = os.path.join(path, file_name)
                with open(file_path, 'w') as file:
                    pass  # Crea un archivo vacío
        else:
            # Crea un archivo en el nivel base
            file_path = os.path.join(base_path, name)
            with open(file_path, 'w') as file:
                pass  # Crea un archivo vacío

# Ejecuta el script para crear la estructura
create_structure(base_dir, structure)

print("Estructura de archivos y carpetas creada con éxito.")
