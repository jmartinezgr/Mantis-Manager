import React, { useState } from 'react';
import Header from './header';
import Sidebar from './SideBar';
import MainContent from './mainContent';
import { TicketProvider } from "../context/ticketContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importamos lo necesario para el enrutamiento
import Ajustes from '../settings/ajustes'; // Importamos los componentes de las rutas
import Profile from '../Perfil/perfil';

import './Layout.css'; // Importa el archivo CSS

/**
 * Componente Layout que estructura la aplicación.
 * Proporciona el contexto de tickets y maneja el enrutamiento.
 * @returns {React.ReactElement} - El componente Layout.
 */
const Layout = () => {
    // Estado para controlar la pestaña activa
    const [activeTab, setActiveTab] = useState("queque");

    /**
     * Maneja el cambio de pestaña.  se usa en el header ya que se le pasa como prop.
     * @param {string} tab - Nombre de la pestaña activa.
     */
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <TicketProvider>
            <Router> {/* Envolvemos el Layout dentro del Router para el enrutamiento */}
                <div className="app-container">
                    {/* Encabezado de la aplicación */}
                    <Header onTabChange={handleTabChange} /> {/* Cambia el valor del activeTab */}
                    <div className="main-container">
                        {/* Barra lateral con la pestaña activa */}
                        <Sidebar activeTab={activeTab} />
                        {/* Contenido principal que cambia según la pestaña activa */}
                        <MainContent activeTab={activeTab} />

                        {/* Definimos las rutas dentro del componente Layout */}
                        <Routes>
                            {/* Ruta para el perfil del usuario */}
                            <Route path="/profile" element={<Profile />} />
                            
                            {/* Ruta para la configuración de seguridad */}
                            <Route path="/perfil/seguridad" element={<Ajustes />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </TicketProvider>
    );
};

export default Layout;
