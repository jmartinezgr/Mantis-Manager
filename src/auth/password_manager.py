import bcrypt

# Hashear una contraseña
def hash_password(password:str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

# Verificar una contraseña
def check_password(hashed:str, password:str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

if __name__ == "__main__":
    # Ejemplo de uso
    password = "mi_contraseña_segura"
    hashed_password = hash_password(password)
    print(f"Contraseña hasheada: {hashed_password}")    

    # Verificar
    if check_password(hashed_password, "mi_contraseña_segura"):
        print("¡Contraseña correcta!")
    else:
        print("Contraseña incorrecta")
