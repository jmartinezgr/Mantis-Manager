import React, { useState } from 'react';

const MainContent = ({activeTab}) => {
  // Estado para controlar qué contenido se muestra
  

  // Función para manejar el clic en los botones de la pestaña
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="main-content">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'queue' ? 'active' : ''}`}
          onClick={() => handleTabClick('queue')}
        >
          En cola
        </button>
        <button
          className={`tab-button ${activeTab === 'processing' ? 'active' : ''}`}
          onClick={() => handleTabClick('processing')}
        >
          En proceso
        </button>
        <button
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => handleTabClick('completed')}
        >
          Terminados
        </button>
      </div>
      <div className="content-box">
        {activeTab === 'board' && <p>board</p>}
        {activeTab === 'maquinas' && <p>maquinas</p>}
        {activeTab === 'tickets' && <p>tickets</p>}
        {activeTab === 'settings' && <p>settings</p>}
        
      
      </div>
    </main>
  );
};

export default MainContent;

