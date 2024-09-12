// src/components/login/Login.jsx
import React from 'react';
import Header from './header';
import LoginForm from './loginForm';
import { useAuth } from '../context/authContext'; 

const Login = () => {
  const { login } = useAuth(); 

  const handleLogin = async (username, password) => {
    try {
      await login(username, password); 
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
      <Header />
      <div className="mt-5 w-full max-w-md">
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

