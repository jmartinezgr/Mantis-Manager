import React, { createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const sessionDuration = 1000 * 60 * 15; // 15 minutos
  const warningDuration = 1000 * 60 * 14; // 14 minutos para advertencia

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowNotification(false);
    const id = setTimeout(() => {
      setShowNotification(true);
    }, warningDuration);
    setTimeoutId(id);
  };

  const refreshToken = async () => {
    console.log('Refrescando token...');
    // Aquí la lógica para refrescar el token
  };

  useEffect(() => {
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    const sessionTimeout = setTimeout(() => {
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      // Redirigir al login si es necesario
    }, sessionDuration);

    return () => {
      clearTimeout(sessionTimeout);
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [timeoutId]);

  return (
    <SessionContext.Provider value={{ showNotification, refreshToken }}>
      {children}
    </SessionContext.Provider>
  );
};
