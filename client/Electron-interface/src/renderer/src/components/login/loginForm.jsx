// src/components/LoginForm.jsx

import React, { useState } from 'react';
import './login.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username, password); // Llama a la función de login simulada pasada como prop
    } else {
      alert('Por favor, ingresa usuario y contraseña.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-form__title">Inicio y creación de usuario</h1>
      <div className="login-form__input-group">
        <label className="login-form__label">
          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-form__input login-form__input--username"
          />
        </label>
      </div>
      <div className="login-form__input-group">
        <label className="login-form__label">
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-form__input login-form__input--password"
          />
        </label>
      </div>
      <button type="submit" className="login-form__button">
        Log in
      </button>
      <p className="login-form__footer">
        En caso de duda o problema contactar con Mantis Manager.
      </p>
    </form>
  );
};

export default LoginForm;
