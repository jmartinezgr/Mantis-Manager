// src/services/authService.js

// Simular el proceso de autenticación
export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación de verificación de credenciales
        if (username === 'admin' && password === '1234') {
          resolve({ message: 'Inicio de sesión exitoso', user: { username: 'admin' } });
        } else {
          reject(new Error('Usuario o contraseña incorrectos'));
        }
      }, 1000); // Simula un retraso de 1 segundo
    });
  };
  