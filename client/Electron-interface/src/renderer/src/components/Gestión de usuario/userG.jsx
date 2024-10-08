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
      phone: '1234567890', // Añadido campo de teléfono
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
      phone: '0987654321', // Añadido campo de teléfono
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
      phone: '1122334455', // Añadido campo de teléfono
      tickets: [],
      history: [
        { action: 'Creación de usuario', date: '2024-05-05' }
      ]
    },
  ]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: '', password: '', phone: '' }); // Añadido teléfono
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserHistory, setSelectedUserHistory] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleAddUser = async () => {
  // Verifica el contenido de formData antes de realizar cualquier acción
  console.log("Datos del formulario:", formData);

  // Verificación de campos vacíos
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.role || !formData.password || !formData.phone) {
    alert('Por favor, completa todos los campos');
    return;
  }

  if (isEditing) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUserId
          ? { ...user, ...formData } // Asegúrate de que formData tenga los datos correctos
          : user
      )
    );
    setIsEditing(false);
    setSelectedUserId(null);
  } else {
    try {
      // Registro de usuario
      const newUser = await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.password,
        formData.role
      );
      
      const uploadU= {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        phone: formData.phone,
        tickets: [],
        history: [
          
        ]
      }


      // Verifica qué contiene newUser
      console.log("Nuevo usuario registrado:", newUser);

      // Asegúrate de que newUser tenga las propiedades esperadas
      

      // Actualiza el estado de los usuarios
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: Date.now(), ...uploadU }
      ]);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al registrar el usuario. Por favor, intenta de nuevo.');
    }
  }

  // Reinicia el formulario
  setFormData({ firstName: '', lastName: '', email: '', role: '', password: '', phone: '' });
};


  const handleEditUser = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: user.password,
      phone: user.phone, // Incluyendo teléfono
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
  // Añadimos logs para depurar
  console.log('First Name:', user.firstName);
  console.log('Last Name:', user.lastName);
  console.log('Email:', user.email);

  // Lógica de filtrado
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
          <input
            type="text"
            name="role"
            placeholder="Rol (admin, usuario, etc.)"
            value={formData.role}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          <HiSearch className="ml-2 text-gray-500" size={24} />
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Lista de Usuarios</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-700">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo electrónico</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <HiTrash />
                  </button>
                  <button
                    onClick={() => handleShowHistory(user)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <HiOutlineEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Historial de Usuario</h2>
            <ul>
              {selectedUserHistory.map((entry, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                  <span>{entry.action}</span>
                  <span>{entry.date}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
