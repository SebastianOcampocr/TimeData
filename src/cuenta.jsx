import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import './cuenta.css'; // Asegúrate de que la ruta sea correcta

function Cuenta() {
    const location = useLocation(); // Obtiene la ubicación actual
    const { username, email, fullName, registrationDate, accountType } = location.state || {}; // Desestructura las propiedades desde el estado de la ubicación

    // Verificar que las propiedades se reciben correctamente
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Full Name:', fullName);
    console.log('Registration Date:', registrationDate);
    console.log('Account Type:', accountType); // Para verificar el tipo de cuenta

    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        const storedProfilePicture = localStorage.getItem('profilePicture');
        if (storedProfilePicture) {
            setProfilePicture(storedProfilePicture);
        }
    }, []);

    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        return names.map(n => n[0].toUpperCase()).join('');
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
                localStorage.setItem('profilePicture', reader.result); // Almacena en localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="cuenta-container">
            <h1 className="cuenta-title">Mi Cuenta</h1>
            <div className="profile-section">
                <div className="profile-picture-container">
                    {profilePicture ? (
                        <img src={profilePicture} alt="Foto de perfil" className="profile-picture" />
                    ) : (
                        <div className="initials">{getInitials(fullName)}</div> // Muestra iniciales si no hay foto
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProfilePictureChange} 
                    />
                </div>
                <div className="profile-info">
                    <p><strong>Tipo de cuenta:</strong> {accountType || 'Desconocido'}</p> {/* Muestra el tipo de cuenta */}
                    <p><strong>Nombre de usuario:</strong> {username || 'No disponible'}</p>
                    <p><strong>Nombre completo:</strong> {fullName || 'No disponible'}</p>
                    <p><strong>Correo electrónico:</strong> {email || 'No disponible'}</p>
                    <p><strong>Fecha de registro:</strong> {registrationDate || 'No disponible'}</p>
                    {/* Agrega más información sobre la cuenta aquí */}
                </div>
            </div>
        </div>
    );
}

export default Cuenta;
