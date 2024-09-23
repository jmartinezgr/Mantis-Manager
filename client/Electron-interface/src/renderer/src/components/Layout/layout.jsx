import React, { useState } from 'react';
import Header from './header';
import Sidebar from './SideBar';
import MainContent from './mainContent';
import { TicketProvider } from "../context/ticketContext";
import { Routes, Route } from 'react-router-dom';
import Ajustes from '../settings/ajustes';
import Profile from '../Perfil/perfil';
import './Layout.css';

const Layout = () => {
    const [activeTab, setActiveTab] = useState("queque");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <TicketProvider>
            <div className="app-container">
                <Header onTabChange={handleTabChange} />
                <div className="main-container">
                    <Sidebar activeTab={activeTab} />
                    <MainContent activeTab={activeTab} />

                    <Routes>
                        <Route path="profile" element={<Profile />} /> {/* Cambia a "profile" */}
                        <Route path="perfil/seguridad" element={<Ajustes />} /> {/* Cambia a "perfil/seguridad" */}
                    </Routes>
                </div>
            </div>
        </TicketProvider>
    );
};

export default Layout;

