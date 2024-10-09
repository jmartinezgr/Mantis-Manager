import React, { useState } from 'react';
import { HiPencil, HiTrash, HiPlus, HiSearch, HiOutlineEye } from 'react-icons/hi';
import { useAuth } from '../context/authContext';

const UserManagement = () => {
  const { register } = useAuth();
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      role: 'admin',
      password: 'admin123',
      phone: '1234567890',
      tickets: ['Ticket #001', 'Ticket #002'],
      history: [
        { action: 'Creación de usuario', date: '2024-01-01' },
        { action: 'Actualización de perfil', date: '2024-02-15' }
      ]
    },
    {
      id: 2,
      firstName: 'María',
      lastName: 'Gómez',
      email: 'maria.gomez@example.com',
      role: 'usuario',
      password: 'user123',
      phone: '0987654321',
      tickets: ['Ticket #003'],
      history: [
        { action: 'Creación de usuario', date: '2024-03-10' },
        { action: 'Reportado un problema', date: '2024-04-22' }
      ]
    },
    {
      id: 3,
      firstName: 'Carlos',
      lastName: 'Ruiz',
      email: 'carlos.ruiz@example.com',
      role: 'usuario',
      password: 'user456',
      phone: '1122334455',
      tickets: [],
      history: [
        { action: 'Creación de usuario', date: '2024-05-05' }
      ]
    },
  ]);
  const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', email: '', role: '', password: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserHistory, setSelectedUserHistory] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    console.log("Datos del formulario:", formData);

    if (!formData.id || !formData.firstName || !formData.lastName || !formData.email || !formData.role || !formData.password || !formData.phone) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (isEditing) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUserId
            ? { ...user, ...formData }
            : user
        )
      );
      setIsEditing(false);
      setSelectedUserId(null);
    } else {
      try {
        // Aquí asumimos que el ID se proporciona directamente por el usuario
        const newUser = await register(
          formData.id, // Envía el ID ingresado
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.phone,
          formData.password,
          formData.role
        );

        const uploadU = {
          id: formData.id, // Asigna el ID ingresado por el usuario
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: formData.role,
          password: formData.password,
          phone: formData.phone,
          tickets: [],
          history: []
        };

        console.log("Nuevo usuario registrado:", newUser);

        setUsers((prevUsers) => [
          ...prevUsers,
          uploadU
        ]);
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Error al registrar el usuario. Por favor, intenta de nuevo.');
      }
    }

    setFormData({ id: '', firstName: '', lastName: '', email: '', role: '', password: '', phone: '' });
  };

  const handleEditUser = (user) => {
    setFormData({
      id: user.id, // Asigna el ID del usuario a editar
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: user.password,
      phone: user.phone,
    });
    setIsEditing(true);
    setSelectedUserId(user.id);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchQuery) ||
      user.lastName.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  });

  const handleShowHistory = (user) => {
    setSelectedUserHistory(user.history);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserHistory([]);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Usuarios</h1>

      <div className="p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{isEditing ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
>
        <option value="" disabled>
        
        </option>
        <option value={1}>Operario de mantenimiento</option>
        <option value={2}>Jefe de desarrollo</option>
        <option value={3}>Operario de Maquinaria</option>
        <option value={4}>Jefe de mantenimiento</option>
       
        
        </select>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
          >
            <HiPlus />
            <span>{isEditing ? 'Actualizar' : 'Agregar'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Buscar Usuarios</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="p-2">Nombre</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2 flex space-x-2">
                    <button onClick={() => handleEditUser(user)} className="text-blue-500 hover:underline">
                      <HiPencil />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:underline">
                      <HiTrash />
                    </button>
                    <button onClick={() => handleShowHistory(user)} className="text-green-500 hover:underline">
                      <HiOutlineEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4">Historial de Usuario</h3>
            <ul>
              {selectedUserHistory.map((item, index) => (
                <li key={index} className="border-b border-gray-300 p-2">
                  {item.action} - {item.date}
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
