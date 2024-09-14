// ActiveTabContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ActiveTabContext = createContext();

// Proveedor del contexto
export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('board'); // Estado inicial

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

// Hook para usar el contexto
export const useActiveTabContext = () => useContext(ActiveTabContext);
