// src/components/Login.jsx

import React from 'react';
import Header from './header';
import LoginForm from './loginForm';
import './login.css';
import { login } from '../../../../service/auhtService';

const Login = () => {
  // Función para manejar el proceso de login simulado
  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password); // Llama a la función simulada
      alert(data.message); // Muestra un mensaje de éxito
      console.log('Datos recibidos:', data);
      // Aquí podrías simular acciones como redirigir al usuario
    } catch (error) {
      alert(error.message); // Muestra un mensaje de error simulado
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-content">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
