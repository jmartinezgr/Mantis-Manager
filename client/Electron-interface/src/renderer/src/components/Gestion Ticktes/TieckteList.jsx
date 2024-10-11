import React, { useState, useEffect } from 'react';
import { HiOutlineEye } from 'react-icons/hi'; // Icono minimalista de ojo
import TicketsDetails from './TicketsDetails'; // Importa el componente de detalles

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null); // Ticket seleccionado
  const [openModal, setOpenModal] = useState(false); // Control del modal

  useEffect(() => {
    // Simula la carga de tickets
    setTimeout(() => {
      setTickets([
        { id: 1, description: 'Ticket 1', status: 'Open' },
        { id: 2, description: 'Ticket 2', status: 'In Progress' },
        { id: 3, description: 'Ticket 3', status: 'Closed' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setOpenModal(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Cierra el modal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  items-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg  w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Tickets List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Description</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-left">{ticket.id}</td>
                  <td className="py-4 px-6">{ticket.description}</td>
                  <td
                    className={`py-4 px-6 text-left ${
                      ticket.status === 'Open'
                        ? 'text-green-500'
                        : ticket.status === 'Closed'
                        ? 'text-red-500'
                        : 'text-orange-500'
                    }`}
                  >
                    {ticket.status}
                  </td>
                  <td className="py-4 px-10 text-left">
                    {/* Botón para ver detalles */}
                    <button
                      onClick={() => handleSelectTicket(ticket)}
                      className="text-blue-500 hover:text-blue-700 transition-all"
                    >
                      <HiOutlineEye size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
            {/* Cerrar el modal */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            {/* Mostrar los detalles del ticket */}
            {selectedTicket && <TicketsDetails ticket={selectedTicket} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
