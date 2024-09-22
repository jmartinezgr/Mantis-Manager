import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const SignUpForm = ({ onSubmit, onGoBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // Limpiar el error y enviar los datos
        setError('');
        onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div>
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">Registarse</h1>
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button type="submit" className="mt-4 bg-blue-500 text-white rounded p-2">
                Registrarse
            </button>
            <button 
                type="button" 
                onClick={onGoBack} 
                className="mt-2 bg-blue-500 text-white rounded p-2 ml-4"
            >
                Regresar 
            </button>
        </form>
    );
};

export default SignUpForm;




