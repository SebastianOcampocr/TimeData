import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de que esté importado
import './UserMenu.css'; // Importa los estilos específicos

function UserMenu({ onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedProfilePicture = localStorage.getItem('profilePicture');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedProfilePicture) {
            setProfilePicture(storedProfilePicture);
        }
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        return names.map(n => n[0].toUpperCase()).join('');
    };

    return (
        <div className="user-menu">
            <button onClick={toggleMenu} className="user-menu-btn">
                {profilePicture ? (
                    <img src={profilePicture} alt="Foto de perfil" className="user-photo" />
                ) : (
                    <div className="initials">{getInitials(username)}</div>
                )}
                <span>{username || 'Usuario'}</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <Link to="/cuenta" className="dropdown-item">Cuenta</Link>
                    <button className="dropdown-item logout-btn" onClick={onLogout}>Cerrar sesión</button> {/* Ahora llama a onLogout */}
                </div>
            )}
        </div>
    );
}

export default UserMenu;
