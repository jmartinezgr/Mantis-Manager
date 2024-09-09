import React, { useState } from 'react';
import Header from './header';
import Sidebar from './SideBar';
import MainContent from './mainContent';
import './Layout.css'; // Importa el archivo CSS



const Layout = () => {
    const[activeTab, setActiveTab] =useState("queque")
    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };
  return (
    <div className="app-container">
      <Header onTabChange={handleTabChange}/>
      <div className="main-container">
        <Sidebar />
        <MainContent activeTab={activeTab} />

      </div>
    </div>
  );
};

export default Layout;
