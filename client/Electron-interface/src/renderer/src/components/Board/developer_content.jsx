import React from 'react';

const developers = [
  { name: 'Andres Felipe Guido', role: 'Desarrollador Full Stack', emoji: '🐒' },
  { name: 'Juan José Martinez', role: 'Desarrollador Backend', emoji: '🐼' },
  { name: 'Paula Misas Marin', role: 'Desarrolladora Frontend', emoji: '🦊' },
  { name: 'Jhorlan Ortega', role: 'Desarrollador de Integración', emoji: '🦁' },
  { name: 'David', role: 'Desarrollador de Seguridad', emoji: '🐻' }
];

const DeveloperSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg  mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Equipo de Desarrollo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <div key={index} className="developer-card bg-gray-100 p-4 rounded-lg shadow-lg text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 text-6xl flex items-center justify-center">
              <span>{dev.emoji}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">{dev.name}</h3>
            <p className="text-gray-500">{dev.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperSection;
