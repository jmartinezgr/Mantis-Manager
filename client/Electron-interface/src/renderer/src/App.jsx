import React from 'react';
import { AuthProvider, useAuth } from './components/context/authContext';
import Login from './components/login/login';
import Layout from './components/Layout/Layout';
import SignUp from './components/Sing up/SingUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="*" element={isAuthenticated ? <Layout /> : <Login />} /> {/* Cambia a "path='*'" */}
      <Route path="/signup" element={<SignUp />} />
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




