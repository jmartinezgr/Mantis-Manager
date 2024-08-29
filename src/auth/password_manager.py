import bcrypt

# Hashear una contraseña
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')  # Convertir de bytes a str para almacenar

# Verificar una contraseña
def check_password(hashed: str, password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

if __name__ == "__main__":
    # Ejemplo de uso
    password = "1018224606"

    # Generar el hash y almacenarlo (simulación de almacenamiento)
    hashed_password = hash_password(password)
    print(f"Contraseña hasheada: {hashed_password}")

    # Simulación de verificación de la contraseña con la contraseña original
    if check_password(hashed_password, password):  # Usar la misma contraseña para verificar
        print("¡Contraseña correcta!")
    else:
        print("Contraseña incorrecta")
