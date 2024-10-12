// Notification.js
import React from 'react';
import { useSession } from '../context/sessionContext';

const Notification = () => {
  const { showNotification, refreshToken } = useSession();

  if (!showNotification) return null;

  return (
    <div className="notification">
      <p>Tu sesión está a punto de expirar. ¿Deseas continuar?</p>
      <button onClick={refreshToken}>Refrescar Sesión</button>
    </div>
  );
};

export default Notification;
