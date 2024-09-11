import React, { useState } from "react";
import GenerarTickets from "../ToolsContents/GenerarTickets";
import { useTicketContext } from "../context/ticketContext";
import HistoryTable from "../historial/HistoryTable";

const SidebarTickets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { history } = useTicketContext();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-item">
        {!isOpen && (
          <>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M240,160v24a16,16,0,0,1-16,16H115.93a4,4,0,0,1-3.24-6.35L174.27,109a8.21,8.21,0,0,0-1.37-11.3,8,8,0,0,0-11.37,1.61l-72,99.06A4,4,0,0,1,86.25,200H32a16,16,0,0,1-16-16V161.13c0-1.79,0-3.57.13-5.33a4,4,0,0,1,4-3.8H48a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,47.73,136H23.92a4,4,0,0,1-3.87-5c12-43.84,49.66-77.13,95.52-82.28a4,4,0,0,1,4.43,4V80a8,8,0,0,0,8.53,8A8.17,8.17,0,0,0,136,79.73V52.67a4,4,0,0,1,4.12-4.12c45.81,5.08,83.8,39.71,97.82,82.78a4,4,0,0,1-3.87,5H184.8a8,8,0,0,0-8.53,8.53A8.17,8.17,0,0,0,192,104H216a4,4,0,0,1,4,3.8C220,156.56,240,160,240,160Z"></path>
              </svg>
            </div>
            <button onClick={handleOpen}>
              <span>Generar ticket</span>
            </button>
          </>
        )}
        <div>{isOpen && <GenerarTickets CerrarHerramienta={handleClose} />}</div>
      </div>

      <div className="sidebar-item">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M225.66,172.34a4,4,0,0,1-4-4V142a4,4,0,0,1,4-4h12a4,4,0,0,1,4,4v26.34A4,4,0,0,1,237.66,172.34Z"></path>
            <path d="M179.74,141.62,112.12,76.48a4,4,0,0,0-5.55-.37A3.94,3.94,0,0,0,105.37,76L87.26,94.8a4,4,0,0,0-.36,5.54,3.94,3.94,0,0,0,5.55.37l10.78-10.86a4,4,0,0,1,5.55.36l55.29,55.9A4,4,0,0,0,168,142.3a3.94,3.94,0,0,0,.37-5.55Z"></path>
          </svg>
        </div>
        <button onClick={handleShowHistory}>
          <span>Historial tickets</span>
        </button>
      </div>

      {showHistory && (
        <HistoryTable data={history} onClose={handleCloseHistory} />
      )}
    </div>
  );
};

export default SidebarTickets;
