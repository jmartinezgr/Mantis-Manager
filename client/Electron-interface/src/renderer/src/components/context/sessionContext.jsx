import React, { createContext, useContext, useEffect, useState } from 'react';
import {authcontext} from './authContext'
const SessionContext = createContext();



export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
    const{logout}=useContext(authcontext);
    
  const [showNotification, setShowNotification] = useState(false);
  const sessionDuration = 1000 * 60 * 15; // 15 minutos
  const warningDuration = 1000 * 60 * 13; // 13 minutos para advertencia

  const resetTimer = () => {
    setShowNotification(false);
    // Reinicia el temporizador para la notificación
    const id = setTimeout(() => {
      setShowNotification(true); // Mostrar la notificación después de 13 minutos
    }, warningDuration);

    // Limpia el temporizador existente si existe
    return id;
  };

  const refreshToken = async () => {
    console.log('Refrescando token...');
    const url = 'http://127.0.0.1:8000/refresh';

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Error al renovar el token');
      }
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refreshToken);
      setShowNotification(false); // Ocultar la notificación si el token se refresca correctamente
    } catch (error) {
      console.error('Error refrescando token:', error);
    }
  };

  useEffect(() => {
    const timeoutId = resetTimer();

    // Tiempo de expiración de la sesión
    const sessionTimeout = setTimeout(() => {
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      logout();
    }, sessionDuration);

    // Limpia los temporizadores al desmontar
    return () => {
      clearTimeout(sessionTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  // Manejar clic en continuar
  const handleContinue = () => {
    refreshToken(); // Refrescar el token
    setShowNotification(false); // Cerrar la notificación
    resetTimer(); // Reiniciar el temporizador
  };

  // Manejar clic en salir
  const handleLogout = () => {
    setShowNotification(false); // Cerrar la notificación
    logout(); // Llamar a la función de logout
  };

  return (
    <SessionContext.Provider value={{ refreshToken }}>
      {children}
      {showNotification && (
        <div className='bg-yellow-300 p-2  fixed bottom-4 right-4 z-10' >
          <p>Tu sesión está a punto de expirar. ¿Deseas seguir?</p>
          <button onClick={handleContinue}>Seguir</button>
          <button onClick={handleLogout}>Salir</button>
        </div>
      )}
    </SessionContext.Provider>
  );
};
