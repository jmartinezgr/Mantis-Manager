import React from 'react';
import './Layout.css'; 
import SidebarTickets from '../TicketsContent/SidebarTickets';


const Sidebar = ({activeTab}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-info">
          <div className="sidebar-header-icon" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/a114458c-9a52-45d0-9740-8dc760b86b4e.png")' }}></div>
          <div className="sidebar-header-text">
            <h1>Tools</h1>
            <p>Ticket Resolution</p>
          </div>
        </div>
      </div>
      <div className="sidebar-content">
        {activeTab ==='board' && <p>Board</p>}
        {activeTab ==='maquinas'&& <p>Maquinas</p>}
        {activeTab ==='tickets'&& <SidebarTickets/>}
        {activeTab === 'settings' && <p>settings</p>}

        
      </div>
    </aside>
  );
};

export default Sidebar;

