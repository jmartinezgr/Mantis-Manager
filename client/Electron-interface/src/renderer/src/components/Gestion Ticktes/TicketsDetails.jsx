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
        <span className="font-semibold">Status:</span> 
        <span 
          className={`font-bold ${
            ticket.status === 'Open' ? 'text-green-500' :
            ticket.status === 'Closed' ? 'text-red-500' : 'text-orange-500'
          }`}
        >
          {ticket.status}
        </span>
      </p>

      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
        onClick={() => alert('Change State')}
      >
        Change State
      </button>
    </div>
  );
};

export default TicketDetails;


