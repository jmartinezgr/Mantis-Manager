import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error en el inicio de sesión:', errorData);
        throw new Error(errorData.detail ? errorData.detail[0].msg : 'Error en el inicio de sesión');
      }

      const data = await response.json();
      console.log('Inicio de sesión exitoso:', data);

      // Guardar los tokens de acceso y refresco
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);

      // Establecer la autenticación y el rol de usuario
      setIsAuthenticated(true);
      setUserRole(data.user_role); // Supongo que el rol está en la respuesta, ajústalo según sea necesario
    } catch (error) {
      console.error('Error capturado en el login:', error.message);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setAccessToken('');
    setRefreshToken('');
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
      console.log('Registro exitoso:', data);
      setIsAuthenticated(true);
      setUserRole(role);
      return data;
    } catch (error) {
      console.error('Error capturado en el registro:', error.message);
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



