import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './singUpHeader'; 
import SignUpForm from './SingUpFomr'; 
import { useAuth } from '../context/authContext'; // Si tienes un contexto de autenticación

const SignUp = () => {
    const navigate = useNavigate();
    const { register } = useAuth(); 

    const handleSignUp = async (data) => {
        try {
            await register(data.email, data.password);
            console.log('Usuario registrado:', data);
            // adicional después del registro
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
            <Header />
            <div className="mt-5 w-full max-w-md">
                <SignUpForm onSubmit={handleSignUp} onGoBack={handleGoBack} />
            </div>
            <footer className="mt-8 text-center text-gray-700">
                <p className="text-sm">
                    ¿Ya tienes una cuenta? 
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        Inicia sesión aquí.
                    </button>
                </p>
                <p className="text-sm mt-2">
                    ¿Problemas con el registro? Contacta a nuestro equipo de soporte.
                </p>
                <a
                    href="mailto:support@mantismanager.com"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    support@mantismanager.com
                </a>
            </footer>
        </div>
    );
};

export default SignUp;

