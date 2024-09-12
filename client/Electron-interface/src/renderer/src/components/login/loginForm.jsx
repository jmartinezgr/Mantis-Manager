// src/components/login/loginForm.jsx
import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username, password);
    } else {
      alert('Por favor, ingresa usuario y contraseña.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">Iniciar Sesión</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Usuario
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Contraseña
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Problemas para iniciar sesión? Contacta a soporte.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
