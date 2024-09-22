import React from 'react';
import { AuthProvider, useAuth } from './components/context/authContext';
import Login from './components/login/login';
import Layout from './components/Layout/Layout';
import SignUp from './components/Sing up/SingUp'; // Importa SignUp
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Layout /> : <Login />} />
      <Route path="/signup" element={<SignUp />} /> {/* Ruta de registro */}
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;




