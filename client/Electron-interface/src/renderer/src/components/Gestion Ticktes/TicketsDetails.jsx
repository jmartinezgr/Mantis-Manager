import React from 'react';

const TicketDetails = ({ ticket }) => {
  return (
    <div className="max-w-md mx-auto bg-white  rounded-lg  ">
      <h2 className="text-2xl font-bold mb-8">Ticket Details</h2>
      <p className="mb-2">
        <span className="font-semibold">ID:</span> {ticket.id}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Description:</span> {ticket.description}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Estado:</span> 
        <span 
          className= {`font-bold, pl-2 ${
            ticket.status === 'En cola' ? 'text-orange-500' :
            ticket.status === 'Closed' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {ticket.status}
        </span>
      </p>

      <button
        className="bg-blue-500 border-4 border-red-500 text-white font-bold py-2 px-4 rounded-full  hover:bg-blue-600  hover:border-gray-100 transition"
        onClick={() => alert('Change State')}
      >
        Cambiar estado 
      </button>
    </div>
  );
};

export default TicketDetails;


