import React, { useState } from 'react';

const Perfil = () => {
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@example.com');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    alert('Cambios guardados');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Perfil</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Información Personal</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Cambiar Contraseña</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Contraseña Actual</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-1">Nueva Contraseña</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">Confirmar Nueva Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </section>
        
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default Perfil;
