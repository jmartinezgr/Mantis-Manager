import React from 'react';
import Header from './header';
import LoginForm from './loginForm';
import './login.css'; // Asegúrate de importar el archivo CSS aquí

const Login = () => {
  return (
    <div className="login-container">
      <Header />
      <div className="login-content">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
