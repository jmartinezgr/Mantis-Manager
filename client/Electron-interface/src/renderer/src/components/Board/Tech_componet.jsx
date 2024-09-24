import React from 'react';

const technologies = [
  { name: 'React', icon: '🔷' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Express', icon: '⚡' },
  { name: 'MongoDB', icon: '🍃' },
];

const TechnologiesSection = () => {
  return (
    <div className="mt-12 bg-white p-6 rounded-lg ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Tecnologías Utilizadas</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {technologies.map((tech, index) => (
          <li key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
            <span className="text-2xl mr-2">{tech.icon}</span>
            <span className="text-lg text-gray-700">{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnologiesSection;
