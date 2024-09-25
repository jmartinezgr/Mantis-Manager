import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // Agregar estado para el rol del usuario

  const login = (username, password) => {
    // Aquí implementarías la lógica de autenticación y establecerías el rol del usuario
    setIsAuthenticated(true);
    setUserRole('jefe de mantenimiento'); // Cambia el rol según la respuesta de la autenticación
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  const register = async (first_name, last_name, email, phone, password, role) => {
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

      console.log('Respuesta de la API:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error en el registro:', errorData);
        throw new Error(errorData.detail ? errorData.detail[0].msg : 'Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
      setIsAuthenticated(true);
      setUserRole(role); // Establecer el rol del usuario después del registro
      return data;
    } catch (error) {
      console.error('Error capturado:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



