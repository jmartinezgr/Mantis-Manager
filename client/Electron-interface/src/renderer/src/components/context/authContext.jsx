// src/components/context/authContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const register = async (first_name, last_name, email, phone, password, role) => {
    // Imprimir los datos antes de enviarlos a la API
    console.log('Datos enviados al registro:', { first_name, last_name, email, phone, password, role });

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone: phone.toString(), // Asegurarse de que el número de teléfono sea una cadena
          password,
          role,
        }),
      });

      // Imprimir la respuesta cruda de la API
      console.log('Respuesta de la API:', response);

      if (!response.ok) {
        const errorData = await response.json(); // Obtener el detalle del error
        console.log('Error en el registro:', errorData); // Imprimir el detalle del error
        throw new Error(errorData.detail ? errorData.detail[0].msg : 'Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data); // Imprimir la respuesta de un registro exitoso
      setIsAuthenticated(true); // Cambiar el estado después de un registro exitoso
      return data;
    } catch (error) {
      console.error('Error capturado:', error.message); // Imprimir el mensaje de error
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


