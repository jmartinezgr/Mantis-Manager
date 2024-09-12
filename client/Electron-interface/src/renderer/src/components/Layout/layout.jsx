import React, { useState } from 'react';
import Header from './header';
import Sidebar from './SideBar';
import MainContent from './mainContent';
import { TicketProvider } from "../context/ticketContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importamos lo necesario para el enrutamiento
import Ajustes from '../settings/ajustes'; // Importamos los componentes de las rutas
import Profile from '../Perfil/perfil';

import './Layout.css'; // Importa el archivo CSS

const Layout = () => {
    const [activeTab, setActiveTab] = useState("queque");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <TicketProvider>
            <Router> {/* Envolvemos el Layout dentro del Router */}
                <div className="app-container">
                    <Header onTabChange={handleTabChange} /> {/* Cambia el valor del activeTab */}
                    <div className="main-container">
                        <Sidebar activeTab={activeTab} />
                        <MainContent activeTab={activeTab} />

                        {/* Definimos las rutas dentro del componente Layout */}
                        <Routes>
                            <Route path="/profile" element={<Profile />} />
                            
                            <Route path="/perfil/seguridad" element={<Ajustes />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </TicketProvider>
    );
};

export default Layout;

