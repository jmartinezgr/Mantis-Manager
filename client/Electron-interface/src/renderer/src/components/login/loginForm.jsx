// src/components/login/loginForm.jsx
import React, { useState } from 'react';

/**
 * Componente LoginForm: Representa el formulario de inicio de sesión.
 * 
 * @param {function} onLogin - Función que se ejecuta al enviar el formulario con las credenciales, entra como prop.
 */
const LoginForm = ({ onLogin }) => {
  // Define los estados para almacenar el nombre de usuario y la contraseña ingresados por el usuario.
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña

  /**
   * Función handleSubmit: Se encarga de manejar el envío del formulario.
   * 
   * @param {object} event - Evento de envío del formulario.
   * 
   * Valida que los campos no estén vacíos y luego llama a la función onLogin
   * proporcionada por el componente padre (Login.jsx) para realizar la autenticación.
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado de recargar la página para no perder el estado 

    // Verificamos que los campos no estén vacíos antes de llamar a onLogin
    if (username.trim() && password.trim()) {
      // Llamamos a la función onLogin con las credenciales de usuario
      onLogin(username, password);
    } else {
      // Si los campos están vacíos, mostramos una alerta
      alert('Por favor, ingresa usuario y contraseña.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-s max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">Iniciar Sesión</h1>
      {/* Formulario de inicio de sesión */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Usuario
            {/* Campo de entrada para el nombre de usuario */}
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Actualizamos el estado cuando el usuario escribe
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Contraseña
            {/* Campo de entrada para la contraseña */}
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado cuando el usuario escribe
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
        </div>
        {/* Botón para enviar el formulario */}
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
