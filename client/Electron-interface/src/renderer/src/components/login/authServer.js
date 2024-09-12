// src/service/authService.js

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular autenticación
        if (username === 'usuario' && password === '1234') {
          resolve({ message: 'Login exitoso' });
        } else {
          reject({ message: 'Nombre de usuario o contraseña incorrectos' });
        }
      }, 1000); // Simular un retraso en la respuesta del servidor
    });
  };
  