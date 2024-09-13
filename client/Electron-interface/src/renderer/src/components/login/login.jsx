// src/components/login/Login.jsx
import React from 'react';
import Header from './header';
import LoginForm from './loginForm';
import { useAuth } from '../context/authContext'; // Importamos el hook de autenticación

/**
 * Componente Login: Muestra la pantalla de inicio de sesión.
 * Utiliza el contexto de autenticación para manejar el proceso de login.
 */
const Login = () => {
  // Obtenemos la función login desde el contexto de autenticación.
  const { login } = useAuth(); 

  /**
   * Función handleLogin: Se encarga de manejar el proceso de inicio de sesión.
   * 
   * @param {string} username - Nombre de usuario ingresado por el usuario.
   * @param {string} password - Contraseña ingresada por el usuario.
   * 
   * Llama a la función login del contexto y maneja posibles errores.
   */
  const handleLogin = async (username, password) => {
    try {
      // Intenta iniciar sesión utilizando el contexto de autenticación.
      await login(username, password); 
    } catch (error) {
      // Muestra un mensaje de error si el login falla.
      alert(error.message); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
      <Header /> {/* Componente del encabezado */}
      <div className="mt-5 w-full max-w-md">
        {/* Componente del formulario de inicio de sesión, pasamos handleLogin como prop */}
        <LoginForm onLogin={handleLogin} />
      </div>
      <footer className="mt-8 text-center text-gray-700">
        <p className="text-sm">
          ¿Problemas con el inicio de sesión? Contacta a nuestro equipo de soporte.
        </p>
        <a
          href="mailto:support@mantismanager.com"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          support@mantismanager.com
        </a>
      </footer>
    </div>
  );
};

export default Login;
