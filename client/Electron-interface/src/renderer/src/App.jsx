// src/App.js
import React from 'react';
import { AuthProvider, useAuth } from './components/context/authContext'; // Importamos el proveedor y el hook de autenticación
import Login from './components/login/Login';
import Layout from './components/Layout/Layout';

/**
 * Componente AppContent: Se encarga de mostrar el contenido de la aplicación según el estado de autenticación.
 * 
 * Si el usuario está autenticado, se muestra el Layout principal de la app; si no, se muestra la pantalla de inicio de sesión (Login).
 */
const AppContent = () => {
  // Obtenemos el estado de autenticación desde el contexto.
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Si el usuario está autenticado, se muestra Layout; de lo contrario, el componente Login */}
      {isAuthenticated ? <Layout /> : <Login />}
    </>
  );
};

/**
 * Componente App: Proveedor del contexto de autenticación para la aplicación.
 * 
 * AuthProvider envuelve el contenido de la aplicación, proporcionando acceso al contexto a todos los componentes hijos.
 */
const App = () => (
  <AuthProvider>
    <AppContent /> {/* Componente que gestiona si mostrar Login o Layout */}
  </AuthProvider>
);

export default App;




