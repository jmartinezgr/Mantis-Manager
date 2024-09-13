// src/components/context/authContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

/**
 * Componente AuthProvider: Proveedor del contexto de autenticación.
 * Este componente envuelve a otros componentes y les proporciona acceso al estado de autenticación.
 * 
 * @param {object} children - Los componentes hijos que serán envueltos por el proveedor.
 */
export const AuthProvider = ({ children }) => {
  // Estado local que gestiona si el usuario está autenticado o no.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Función login: Simula un proceso de autenticación de usuario.
   * 
   * @param {string} username - Nombre de usuario (se omite en este ejemplo).
   * @param {string} password - Contraseña del usuario (se omite en este ejemplo).
   * 
   * Esta función podría incluir la lógica para verificar credenciales de usuario contra un backend.
   * Si las credenciales son válidas, se actualiza el estado de autenticación a `true`.
   */
  const login = (username, password) => {
    // Aquí podrías agregar la lógica de autenticación, como hacer una llamada a una API para verificar las credenciales.
    // Si la autenticación es exitosa:
    setIsAuthenticated(true);
  };

  /**
   * Función logout: Cierra la sesión del usuario.
   * 
   * Esta función simplemente actualiza el estado de autenticación a `false`, indicando que el usuario ha cerrado sesión.
   */
  const logout = () => {
    setIsAuthenticated(false);
  };

  /**
   * El componente AuthContext.Provider envuelve a los componentes hijos y les proporciona acceso
   * a las funciones `login`, `logout` y al estado de `isAuthenticated`.
   */
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado useAuth: Proporciona acceso a los valores del contexto de autenticación.
 * Este hook facilita el uso del contexto en otros componentes sin necesidad de importar `useContext` cada vez.
 * 
 * @returns {object} - Un objeto con las propiedades `isAuthenticated`, `login` y `logout`.
 */
export const useAuth = () => useContext(AuthContext);

