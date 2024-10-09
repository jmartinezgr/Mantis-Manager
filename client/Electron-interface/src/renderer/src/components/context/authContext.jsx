import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const login = async (id, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ id, password })
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();

      // Guardar tokens y datos del usuario en localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.data));

      // Actualizar el estado de autenticación
      setIsAuthenticated(true);  // Cambiar el estado después de iniciar sesión
      console.log(data.data)
      setUserRole(data.data.role_id)
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Eliminar los tokens y la información del usuario de localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    // Actualizar el estado de autenticación
    setIsAuthenticated(false);
    setUserRole('');
    setAccessToken('');
    setRefreshToken('');
  };

  const register = async (id, first_name, last_name, email, phone, password, role) => {

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, // Incluir la cédula en la solicitud
          first_name,
          last_name,
          email,
          phone: phone.toString(),
          password,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error en el registro:', errorData);
        throw new Error(errorData.detail ? errorData.detail[0].msg : 'Error en el registro');
      }

      const data = await response.json();

      // Guardar tokens y datos del usuario en localStorage  a cambio esto
      
      setIsAuthenticated(true); // Cambiar el estado después de un registro exitoso
      console.log(data.data)
      return data.data;

    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, register, accessToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

