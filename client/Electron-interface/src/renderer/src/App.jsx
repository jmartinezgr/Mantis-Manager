// src/App.js
import React from 'react';
import { AuthProvider, useAuth } from './components/context/authContext';
import Login from './components/login/Login';
import Layout from './components/Layout/Layout';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <Layout /> : <Login />}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;



