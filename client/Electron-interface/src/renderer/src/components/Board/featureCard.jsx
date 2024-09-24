import React, { useState } from 'react';
import { FaTools, FaInfoCircle, FaCog, FaUser, } from 'react-icons/fa'; // Ejemplo de íconos

const FeatureCard = ({ title, description, category, details }) => {
  const [showMore, setShowMore] = useState(false);

  // Definir diferentes colores e íconos según la categoría
  const categoryStyles = {
    mantenimiento: {
      bgColor: 'bg-green-100', // Color de fondo para mantenimiento
      hoverColor: 'hover:bg-green-300',
      icon: <FaTools size={24} />,
    },
    tickets: {
      bgColor: 'bg-yellow-100', // Color de fondo para tickets
      hoverColor: 'hover:bg-yellow-300',
      icon: <FaInfoCircle size={24} />,
    },
    configuracion: {
      bgColor: 'bg-purple-100', // Color de fondo para configuración
      hoverColor: 'hover:bg-purple-300',
      icon: <FaCog size={24} />,
    },
    reportes:{
        bgColor: 'bg-pink-100', // Color de fondo para reportes
      hoverColor: 'hover:bg-pink-300',
      icon: <FaInfoCircle size={24} />,
    },
    usuarios:{
        bgColor: 'bg-blue-100', // Color de fondo para usuarios
      hoverColor: 'hover:bg-blue-300',
      icon: <FaUser size={24} />,
    }
  };

  const { bgColor, hoverColor, icon } = categoryStyles[category] || categoryStyles.mantenimiento; // Default a mantenimiento

  return (
    <div className={`relative ${bgColor}  rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-out group`}>
      {/* Icono personalizado por categoría */}
      <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${hoverColor}`}>
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-10 text-center">
        {title}
      </h3>

      <p className="text-gray-600 text-center mb-4">
        {description}
      </p>

      {/* Mostrar más detalles al hacer clic */}
      {showMore && (
        <div className={`${bgColor}  ml-3 `}>
          <p className="text-gray-700">{details}</p>
        </div>
      )}

      {/* Botón para alternar "Ver más" */}
      <div className="text-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ${hoverColor} transition-colors duration-200`}
        >
          {showMore ? 'Ver menos' : 'Ver más'}
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;
