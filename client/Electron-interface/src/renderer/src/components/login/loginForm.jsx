import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

/**
 * Componente LoginForm: Formulario de inicio de sesión.
 *
 * @param {function} onLogin - Función que se ejecuta al enviar el formulario con las credenciales.
 * @param {string} errorMessage - Mensaje de error que se muestra si ocurre un error.
 */
const LoginForm = ({ onLogin, errorMessage }) => {
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar la visibilidad de la contraseña
  const [localError, setLocalError] = useState(''); // Estado para manejar errores locales en el formulario

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita la recarga de página.

    // Verificamos que los campos no estén vacíos
    if (username.trim() && password.trim()) {
      setLocalError(''); // Limpiamos el mensaje de error local si los campos están completos
      onLogin(username, password); // Ejecutamos la función onLogin con las credenciales
    } else {
      // Si algún campo está vacío, mostramos el mensaje de error
      setLocalError('Por favor, ingresa usuario y contraseña.');

      // Enfocamos el campo de usuario
      document.getElementById('username').focus();
    }
  };

  // Alterna la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-s max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">Iniciar Sesión</h1>
      
      {/* Mostrar mensaje de error si existe */}
      {localError && (
        <div className="text-red-500 text-sm mb-4">
          {localError}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">
          {errorMessage}
        </div>
      )}

      {/* Formulario de inicio de sesión */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Usuario
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Actualiza el estado cuando el usuario escribe
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Contraseña
            <input
              id="password"
              type={showPassword ? 'text' : 'password'} // Cambia el tipo de input según el estado showPassword
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado cuando el usuario escribe
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10" // Añadimos padding para el icono
            />
          </label>
          {/* Botón para alternar visibilidad de la contraseña */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <HiEyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <HiEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        {/* Botón de envío del formulario */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
