import React from 'react';
import SidebarTickets from '../TicketsContent/SidebarTickets';

const Sidebar = ({ activeTab }) => {
  return (
    <aside className="w-16 bg-gray-800 text-gray-100 shadow-lg flex flex-col items-center py-6">
      <div
        className="w-12 h-12 bg-cover bg-center rounded-full border-2 border-gray-700 mb-4"
        style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/a114458c-9a52-45d0-9740-8dc760b86b4e.png")' }}
      ></div>
      <nav>
        <ul className="space-y-4">
          {activeTab === 'board' && (
            <li className={`flex items-center justify-center w-10 h-10 rounded-full ${activeTab === 'board' ? 'bg-gray-800 text-blue-400' : 'bg-gray-700 text-gray-400'} hover:bg-gray-600`}>
              <span className="text-lg font-semibold">B</span>
            </li>
          )}
          {activeTab === 'maquinas' && (
            <li className={`flex items-center justify-center w-10 h-10 rounded-full ${activeTab === 'maquinas' ? 'bg-gray-800 text-green-400' : 'bg-gray-700 text-gray-400'} hover:bg-gray-600`}>
              <span className="text-lg font-semibold">M</span>
            </li>
          )}
          {activeTab === 'tickets' && (
            <div>
            <li className={`flex items-center justify-center w-10 h-10 rounded-full ${activeTab === 'tickets' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-700 text-gray-400'} hover:bg-gray-600`}>

<span className="text-lg font-semibold">T</span>
               
            </li >
            <SidebarTickets className=" mt-8"/>
            </div>
            
            
          )}
          {activeTab === 'settings' && (
            <li className={`flex items-center justify-center w-10 h-10 rounded-full ${activeTab === 'settings' ? 'bg-gray-800 text-red-400' : 'bg-gray-700 text-gray-400'} hover:bg-gray-600`}>
              <span className="text-lg font-semibold">S</span>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


