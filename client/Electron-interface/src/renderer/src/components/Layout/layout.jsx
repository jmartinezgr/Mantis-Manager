import React, { useState } from 'react';
import Header from './header';
import Sidebar from './SideBar';
import MainContent from './mainContent';
import { TicketProvider } from "../context/ticketContext";
import './Layout.css'; // Importa el archivo CSS



const Layout = () => {
    const[activeTab, setActiveTab] =useState("queque")
    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };
  return (
    <TicketProvider>

    <div className="app-container">
      <Header onTabChange={handleTabChange}/>{/**    el header es el encargado de cambiar  el valor del active tab que se usa para ir cambiando las vistas del layout  */}
      <div className="main-container">
        <Sidebar activeTab={activeTab} />
        <MainContent activeTab={activeTab} />

      </div>
    </div>
    </TicketProvider>
  );
};

export default Layout;
