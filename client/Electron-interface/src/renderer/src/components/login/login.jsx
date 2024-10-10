import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import LoginForm from './loginForm';
import { useAuth } from '../context/authContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleLogin = async (username, password) => {
    try {
      // Intentamos realizar el inicio de sesión
      await login(username, password);
      setErrorMessage(''); // Limpiamos el mensaje de error si el login es exitoso
    } catch (error) {
      // Si ocurre un error, actualizamos el estado con el mensaje de error
      setErrorMessage(error.message);

      // Enfocamos el campo de nombre de usuario tras el error
      document.getElementById('username').focus();
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
      <Header />
      <div className="mt-5 w-full max-w-md">
        {/* Pasamos el mensaje de error al componente LoginForm */}
        <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
      </div>
      <button
        onClick={handleSignUp}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Registrarse
      </button>
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
