import React from 'react';
import { AuthProvider, useAuth } from './components/context/authContext';
import { SessionProvider } from './components/context/sessionContext';
import Login from './components/login/login';
import Layout from './components/Layout/Layout';
import SignUp from './components/Sing up/SingUp';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="*" element={isAuthenticated ? <Layout /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <SessionProvider>
      <Router>
        <AppContent />
      </Router>
    </SessionProvider>
  </AuthProvider>
);

export default App;




