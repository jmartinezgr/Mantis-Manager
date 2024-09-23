import React, { useState } from 'react';

const SignUpForm = ({ onSubmit, onGoBack }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Jefe de Desarrollo'); // Default role
    const [error, setError] = useState('');

    const roles = ["Jefe de Desarrollo", "Operario de Mantenimiento", "Operario de Maquinaria", "Jefe de Mantenimiento"];

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Correo electrónico no válido.');
            return;
        }

        setError('');
        onSubmit({ first_name: firstName, last_name: lastName, email, phone: Number(phone), password, role });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">Registrarse</h1>
            <div>
                <label className="block mb-2">Nombre:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Apellido:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Correo electrónico:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Teléfono:</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Confirmar Contraseña:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Rol:</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                >
                    {roles.map((roleOption) => (
                        <option key={roleOption} value={roleOption}>
                            {roleOption}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button type="submit" className="mt-4 bg-blue-500 text-white rounded p-2">
                Registrarse
            </button>
            <button 
                type="button" 
                onClick={onGoBack} 
                className="mt-2 bg-gray-500 text-white rounded p-2 ml-4"
            >
                Regresar 
            </button>
        </form>
    );
};

export default SignUpForm;


