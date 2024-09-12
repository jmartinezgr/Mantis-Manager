import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener React Router instalado y configurado

const Ajustes = () => (
  <div className="absolute right-4 top-16 bg-gray-900 text-white rounded-lg shadow-lg w-48 py-2">
    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-800">Perfil</Link>
    <Link to="/privacy" className="block px-4 py-2 hover:bg-gray-800">Privacidad</Link>
    <Link to="/perfil/seguridad" className="block px-4 py-2 hover:bg-gray-800">Seguridad</Link>
  </div>
);

export default Ajustes;

