import React, { useState } from 'react';
import { FaTools, FaChartBar, FaUserCog, FaBell, FaBoxOpen, FaCode, FaUsers } from 'react-icons/fa';
import { SiFastapi, SiElectron, SiReact } from 'react-icons/si';

const animalEmojis = [
  '🐱', // Gato
  '🐶', // Perro
  '🐻', // Oso
  '🐰', // Conejo
  '🦊', // Zorro
];

const Board = () => {
  const [isExpanded, setIsExpanded] = useState({});

  const toggleExpand = (section) => {
    setIsExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
      <h1 className="text-6xl font-bold text-center text-gray-900 mb-4">
        Mantis Manager <FaTools className="inline-block text-blue-500" />
      </h1>
      <p className="text-lg text-center text-gray-700 mb-8">
        Optimiza la gestión de mantenimiento de tu empresa con una solución integral y eficiente.
      </p>

      <div className="space-y-6">
        {[
          {
            title: "Descripción del Problema",
            content: (
              <p className="text-gray-600">
                La falta de un sistema estructurado para la gestión de mantenimientos puede llevar a tiempos de respuesta prolongados. Mantis Manager ofrece una solución integral para la gestión de mantenimientos y reparaciones de máquinas, asegurando un rendimiento óptimo en la producción.
              </p>
            ),
            icon: <FaTools className="text-blue-500" />,
            key: 'problem'
          },
          {
            title: "Tecnologías Utilizadas",
            content: (
              <div className="flex space-x-4 justify-center mt-4">
                {[
                  { tech: 'FastAPI', icon: <SiFastapi className="h-10 w-10 text-green-500" /> },
                  { tech: 'Electron', icon: <SiElectron className="h-10 w-10 text-blue-600" /> },
                  { tech: 'React', icon: <SiReact className="h-10 w-10 text-blue-400" /> },
                ].map(({ tech, icon }) => (
                  <div key={tech} className="flex flex-col items-center">
                    {icon}
                    <span className="mt-1 text-gray-700 text-sm capitalize">{tech}</span>
                  </div>
                ))}
              </div>
            ),
            key: 'tech'
          },
          {
            title: "Funcionalidades del Sistema",
            content: (
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {[
                  { feature: "Reporte de Daños", description: "Generación rápida de tickets de mantenimiento.", icon: <FaBell className="text-orange-500" /> },
                  { feature: "Gestión de Tickets", description: "Filtrado y asignación de tickets a técnicos.", icon: <FaChartBar className="text-purple-500" /> },
                  { feature: "Historial de Mantenimientos", description: "Registro centralizado de mantenimientos realizados.", icon: <FaBoxOpen className="text-teal-500" /> },
                  { feature: "Planificación de Mantenimiento Preventivo", description: "Programación de mantenimientos basados en el tiempo de uso.", icon: <FaTools className="text-blue-600" /> },
                  { feature: "Gestión de Inventario", description: "Control de repuestos y alertas de bajo inventario.", icon: <FaUserCog className="text-red-500" /> },
                ].map(({ feature, description, icon }) => (
                  <li key={feature} className="flex items-center space-x-2">
                    {icon}
                    <div>
                      <strong>{feature}:</strong> {description}
                    </div>
                  </li>
                ))}
              </ul>
            ),
            key: 'features'
          },
          {
            title: "Flujo de Interacción",
            content: (
              <p className="text-gray-600">
                Un operador reporta un fallo crítico generando un ticket que detalla el problema. Un técnico recibe la notificación, se encarga de la reparación y documenta la intervención, minimizando así el impacto en la producción y asegurando que las operaciones se reanuden rápidamente.
              </p>
            ),
            key: 'interaction',
            icon: <FaBell className="text-yellow-500" />,
          },
          {
            title: "Impacto Esperado",
            content: (
              <p className="text-gray-600">
                La implementación de Mantis Manager reducirá significativamente el tiempo de inactividad de las máquinas, mejorará la eficiencia del área de mantenimiento y aumentará la productividad general de la empresa. También proporcionará una mayor organización y transparencia en la gestión.
              </p>
            ),
            key: 'impact',
            icon: <FaChartBar className="text-green-600" />,
          },
          {
            title: "Desarrolladores",
            content: (
              <div className="flex flex-col space-y-2 text-gray-700">
                {[
                  { name: "Andres Felipe Guido", role: "Scrum Master", emoji: animalEmojis[0] },
                  { name: "Juan José Martinez", role: "Product owner ", emoji: animalEmojis[1] },
                  { name: "Paula Misas Marin", role: "Desarrolladora", emoji: animalEmojis[2] },
                  { name: "Jhorlan Ortega", role: "Desarrollador", emoji: animalEmojis[3] },
                  { name: "David", role: "Desarrollador", emoji: animalEmojis[4] },
                ].map(({ name, role, emoji }) => (
                  <div key={name} className="flex items-center space-x-2">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <strong>{name}</strong> - {role}
                    </div>
                  </div>
                ))}
              </div>
            ),
            key: 'developers',
            icon: <FaUsers className="text-purple-600" />,
          }
        ].map(({ title, content, key, icon }) => (
          <div 
            key={key} 
            className={`border-4 border-transparent hover:border-pink-400 rounded-md p-4 bg-gray-50 transition-all duration-300 shadow-sm ${isExpanded[key] ? 'bg-white' : ''}`}
            onClick={() => toggleExpand(key)}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              {icon}
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            {isExpanded[key] && (
              <div className="p-2 text-gray-600 text-sm">
                {content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
