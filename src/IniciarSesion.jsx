import React, { useCallback, useState } from 'react'; // Importar useState
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './IniciarSesion.css'; // Estilos específicos
import muñecosImage from './templates/Imagenmuñecos.png';

const IniciarSecion = () => {
    const [numero, setNumero] = useState(''); // Estado para el número de celular
    const [contraseña, setContraseña] = useState(''); // Estado para la contraseña
    const navigate = useNavigate(); // Hook para redireccionar

    const onBotonContainerClick = useCallback(async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
    
        // Validar que ambos campos no estén vacíos
        if (!numero || !contraseña) {
            alert('Por favor, completa ambos campos.');
            return;
        }
    
        try {
            const response = await fetch('https://timedata.azurewebsites.net/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: numero, // Envío del número como email
                    password: contraseña,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el inicio de sesión');
            }
    
            const data = await response.json();
    
            // Almacenar el nombre de usuario en localStorage
            localStorage.setItem('username', data.user.username); // Guarda el nombre de usuario
            localStorage.setItem('email', data.user.email); // Guarda el email si es necesario
    
            // Redirigir al usuario a la página principal
            navigate('/'); 
        } catch (error) {
            alert('Credenciales incorrectas o error en la conexión: ' + error.message);
        }
    }, [numero, contraseña, navigate]); // Dependencias

    return (
        <div className="iniciarsecion">
            <div className="content-container">
                <div className="sing-in">
                    <h2 className="iniciar-secin">Iniciar sesión</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            id="numero"
                            className="escribirlo"
                            placeholder="Número de celular"
                            value={numero} // Enlazar el valor
                            onChange={(e) => setNumero(e.target.value)} // Actualizar estado
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="contraseña"
                            className="escribirlo"
                            placeholder="Contraseña"
                            value={contraseña} // Enlazar el valor
                            onChange={(e) => setContraseña(e.target.value)} // Actualizar estado
                        />
                    </div>
                    <button className="boton" onClick={onBotonContainerClick}>
                        Iniciar Sesión
                    </button>
                    <div className="extra-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            Recordarme
                        </label>
                        <a href="/help" className="help-link">¿Necesitas ayuda?</a>

                    </div>
                    <div className="cuadro-inner">
                        <span>¿No tienes una cuenta?</span>
                        <Link to="/RegistroCoder" className="register-link">Registrarse coder</Link>
                        <Link to="/RegistroCrafter" className="register-link">/Crafter</Link>
                    </div>
                </div>
                <div className="image-container">
                    <img className="imagenmuecos-icon" alt="Muñecos" src={muñecosImage} />
                </div>
            </div>
        </div>
    );
};

export default IniciarSecion;
