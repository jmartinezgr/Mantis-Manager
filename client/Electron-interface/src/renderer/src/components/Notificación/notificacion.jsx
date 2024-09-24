import React, { useState, useEffect } from 'react';

const TicketNotification = ({ notification }) => (
  <div className="bg-white p-5 shadow-lg rounded-lg flex justify-between items-center mb-3 border-l-4 transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02] 
    border-blue-400">
    <div>
      <p className="text-sm text-gray-800 font-semibold">
        {notification.type === 'ticket_request' && `Nueva solicitud de ticket: ${notification.ticketId}`}
        {notification.type === 'ticket_update' && `Actualización en ticket: ${notification.ticketId}`}
        {notification.type === 'machine_ready' && `Máquina lista para: ${notification.machine}`}
      </p>
      <span className={`block text-xs font-bold mt-1 ${
        notification.type === 'ticket_request' ? 'text-green-500' 
        : notification.type === 'ticket_update' ? 'text-yellow-500' 
        : 'text-blue-500'
      }`}>
        {notification.message}
      </span>
      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
    </div>
    <button className="text-blue-500 hover:text-blue-600 hover:underline text-sm transition duration-150">
      Ver Detalles
    </button>
  </div>
);

const TicketNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'ticket_request', ticketId: 123, message: 'Solicitud de nuevo ticket.', time: 'Hace 5 min' },
    { id: 2, type: 'ticket_update', ticketId: 124, message: 'El ticket ha sido actualizado.', time: 'Hace 15 min' },
    { id: 3, type: 'machine_ready', machine: 'Cortadora #5', message: 'La máquina está lista.', time: 'Hace 30 min' },
  ]);

  // Simulación de llegada de nuevas notificaciones
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: notifications.length + 1,
        type: ['ticket_request', 'ticket_update', 'machine_ready'][Math.floor(Math.random() * 3)],
        ticketId: notifications.length + 100,
        machine: `Máquina ${Math.floor(Math.random() * 10) + 1}`,
        message: 'Nueva actualización generada.',
        time: 'Hace unos segundos',
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }, 15000); // Nuevas notificaciones cada 15 segundos

    return () => clearInterval(interval);
  }, [notifications]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Notificaciones del Sistema de Tickets</h3>
      <div className="overflow-y-auto h-64 p-5 bg-white rounded-lg shadow-md">
        {notifications.map((notification) => (
          <TicketNotification
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketNotifications;
