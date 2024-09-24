import React from 'react';
import TicketsBoard from '../TicketsContent/TicketBoard';
import Ajustes from '../settings/ajustes';
import Maquina from '../Maquina/maquina';
<<<<<<< Updated upstream
import Board from '../board/board';
=======
import Board from '../Board/board_content'
>>>>>>> Stashed changes

/**
 * Componente principal para mostrar el contenido basado en la pestaña activa.
 * 
 * @param {Object} props - Props del componente.
 * @param {string} props.activeTab - El nombre de la pestaña activa que determina qué contenido mostrar.
 * 
 * @returns {React.ReactElement} - El contenido principal basado en la pestaña activa.
 */
const MainContent = ({ activeTab }) => {

  // Renderiza el contenido basado en el valor de activeTab
  return (
    <main className="main-content">
      <div className="tabs">
        {/* cambio de pestaña dado por active tab que  viene del header  */}
      </div>
      <div className="content-box">
<<<<<<< Updated upstream
        {activeTab === 'board' && <Board/>}
=======
        {activeTab === 'board' && <Board className='bg-white'/>}
>>>>>>> Stashed changes
        {activeTab === 'maquinas' && <Maquina />}
        {activeTab === 'tickets' && <TicketsBoard />}
        {/*  */}
      </div>
    </main>
  );
};

export default MainContent;


