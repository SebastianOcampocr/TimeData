import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistroCrafter.css';
import muneno2 from './templates/muñeco2.png';

const Registrocrafter = () => {
    const [numeroCelular, setNumeroCelular] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Navegación para redirigir después del registro

    const handleSubmit = async () => {
        if (!numeroCelular || !nombreCompleto || !contrasena) {
            setError('Por favor, rellena todos los campos.');
        } else {
            setError('');
            // Intentar registrarse
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: nombreCompleto,
                        email: numeroCelular,
                        password: contrasena,
                        accountType: 'Crafter', // Agregar el tipo de cuenta
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error en el registro');
                }

                const data = await response.json();
                console.log(data); // Aquí puedes manejar la respuesta

                // Iniciar sesión automáticamente
                const loginResponse = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: numeroCelular,
                        password: contrasena,
                    }),
                });

                if (!loginResponse.ok) {
                    throw new Error('Error al iniciar sesión automáticamente');
                }

                const loginData = await loginResponse.json();
                console.log(loginData); // Manejar los datos de inicio de sesión

                // Redirigir después de registrarse e iniciar sesión
                navigate('/cuenta', { state: { accountType: 'Crafter', user: loginData.user } });
            } catch (error) {
                setError('Error al registrarse: ' + error.message);
            }
        }
    };

    return (
        <div className="registrocrafter">
            <div className="registro-del-crafter-parent">
                <div className="registro-del-crafter">Registro del Crafter</div>
                <div className="email">
                    <div className="correo-celular-wrapper">
                        <div className="correo-celular">Número de celular</div>
                    </div>
                    <input 
                        type="text" 
                        className="escribirlo" 
                        value={numeroCelular}
                        onChange={(e) => setNumeroCelular(e.target.value)}
                    />
                </div>
                <div className="email">
                    <div className="correo-celular-wrapper">
                        <div className="correo-celular">Nombre completo</div>
                    </div>
                    <input 
                        type="text" 
                        className="escribirlo" 
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                    />
                </div>
                <div className="contrasea">
                    <div className="correo-celular-wrapper">
                        <div className="correo-celular">Contraseña</div>
                        <div className="ocultar">
                            <div className="ojo" />
                            <div className="ocultar1" />
                        </div>
                    </div>
                    <input 
                        type="password" 
                        className="escribirlo" 
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button className="boton" onClick={handleSubmit}>
                    Registrarse
                </button>
                <div className="ayudaaa">
                    <a href="/help" className="help-link">¿Necesitas ayuda?</a>

                </div>
            </div>
            <div className="ya-tienes-una-container">
                <span>{`¿Ya tienes una cuenta? `}</span>
                <Link to="/iniciarsecion" className="iniciar-sesion">
                    Iniciar sesión
                </Link>
            </div>
            <img className="mueco2-icon" alt="" src={muneno2} />
        </div>
    );
};

export default Registrocrafter;
