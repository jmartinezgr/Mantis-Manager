import React, { useState } from 'react';
import TicketsBoard from '../TicketsContent/TicketBoard'

const MainContent = ({activeTab}) => {
  // Estado para controlar qué contenido se muestra
  

  // Función para manejar el clic en los botones de la pestaña
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="main-content">
      <div className="tabs">
        
      </div>
      <div className="content-box">
        {activeTab === 'board' && <p>board</p>}
        {activeTab === 'maquinas' && <p>maquinas</p>}
        {activeTab === 'tickets' && <TicketsBoard/>}
        {activeTab === 'settings' && <p>settings</p>}
        
      
      </div>
    </main>
  );
};

export default MainContent;

