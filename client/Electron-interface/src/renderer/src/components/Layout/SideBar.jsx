import React from 'react';
import './Layout.css'; 


const Sidebar = () => {
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
        <div className="sidebar-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M240,160v24a16,16,0,0,1-16,16H115.93a4,4,0,0,1-3.24-6.35L174.27,109a8.21,8.21,0,0,0-1.37-11.3,8,8,0,0,0-11.37,1.61l-72,99.06A4,4,0,0,1,86.25,200H32a16,16,0,0,1-16-16V161.13c0-1.79,0-3.57.13-5.33a4,4,0,0,1,4-3.8H48a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,47.73,136H23.92a4,4,0,0,1-3.87-5c12-43.84,49.66-77.13,95.52-82.28a4,4,0,0,1,4.43,4V80a8,8,0,0,0,8.53,8A8.17,8.17,0,0,0,136,79.73V52.67a4,4,0,0,1,4.12-4.12c45.81,5.08,83.8,39.71,97.82,82.78a4,4,0,0,1-3.87,5H184.8a8,8,0,0,0-8.53,8.53A8.17,8.17,0,0,0,192,104H216a4,4,0,0,1,4,3.8C220,156.56,240,160,240,160Z"></path>
            </svg>
          </div>
          <span>Manual de instrucciones</span>
        </div>
        <div className="sidebar-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M225.66,172.34a4,4,0,0,1-4-4V142a4,4,0,0,1,4-4h12a4,4,0,0,1,4,4v26.34A4,4,0,0,1,237.66,172.34Z"></path>
              <path d="M179.74,141.62,112.12,76.48a4,4,0,0,0-5.55-.37A3.94,3.94,0,0,0,105.37,76L87.26,94.8a4,4,0,0,0-.36,5.54,3.94,3.94,0,0,0,5.55.37l10.78-10.86a4,4,0,0,1,5.55.36l55.29,55.9A4,4,0,0,0,168,142.3a3.94,3.94,0,0,0,.37-5.55Z"></path>
            </svg>
          </div>
          <span>Ayuda</span>
        </div>
        <div className="sidebar-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M100,52a60,60,0,1,0,60,60A60.07,60.07,0,0,0,100,52Zm20,85.48V96H84v-9.44a2,2,0,0,1,2-2h34a2,2,0,0,1,2,2V96H84v6.08A2,2,0,0,1,84,104h34V138.48A12,12,0,0,1,120,137.48ZM72,96v-4a4,4,0,0,1,4-4H92a4,4,0,0,1,4,4v4Zm112,4v-4a4,4,0,0,0-4-4H172a4,4,0,0,0-4,4v4Zm24-10.08V96h-20v-4a4,4,0,0,0-4-4h-12a4,4,0,0,0-4,4v4h-20v-6.08a2,2,0,0,0-2-2H98a2,2,0,0,0-2,2V96h20V76H96V72h60v4h20v4h-20v16h20v6.08a2,2,0,0,0,2,2h28a2,2,0,0,0,2-2V96h20v-4Z"></path>
            </svg>
          </div>
          <span>Soporte</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

