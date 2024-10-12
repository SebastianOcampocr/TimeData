import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'; 
import Chatbot from './Chatbot';
import Donaciones from './Donaciones.jsx';
import IniciarSesion from './IniciarSesion.jsx';
import SubirReto from './SubirReto';
import Cuenta from './cuenta.jsx'; 
import reacnative from './templates/Reactnativefoto.png';
import RegistroCoder from './RegistroCoder.jsx';
import java from './templates/javafoto.png';
import nodejs from './templates/jsfoto.png';
import reactjs from './templates/Reactjsfoto.png';
import php from './templates/phpfoto.png';
import python from './templates/pythonfoto.png';
import iniciofotos from './templates/fotoinicio.png';
import inicio from './templates/logofoto.png';
import './App.css';
import UserMenu from './UserMenu'; 
import RegistroCrafter from './RegistroCrafter';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // Estado para la foto de perfil

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedProfilePicture = localStorage.getItem('profilePicture'); // Cargar foto de perfil
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }

    if (location.pathname === '/comentarios') {
      const comentariosSection = document.getElementById('comentarios');
      if (comentariosSection) {
        comentariosSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('profilePicture'); // Eliminar foto de perfil al cerrar sesión
    setUsername('');
    setProfilePicture(''); // Limpiar el estado de la foto de perfil
    navigate('/');
  }

  return (
    <div className="app">
      <header className="app-header">
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/">
              <img src={inicio} alt="Inicio" className="logo" />
            </Link>
          </div>
          <div className="nav-links-container">
            <ul className="nav-links">
              <li className="nav-item"><Link to="/donaciones">Donaciones</Link></li>
              <li className="nav-item"><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
              <li className="nav-item"><Link to="/comentarios">Comentarios</Link></li>
              <li className="nav-item"><Link to="/chatbot">Chat bot</Link></li>
              <li className="nav-item"><Link to="/subirreto">Subir reto</Link></li>
              {!username && (
                <li className="nav-item"><Link to="/iniciarsecion">Iniciar sesión</Link></li>
              )}
            </ul>
            <button className="create-challenge-btn">+ Crear reto</button>
            {username && <UserMenu onLogout={logout} username={username} />}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage username={username} />} />
        <Route path="/donaciones" element={<Donaciones />} />
        <Route path="/comentarios" element={<HomePage username={username} />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/subirreto" element={<SubirReto />} />
        <Route path="/iniciarsecion" element={<IniciarSesion />} />
        <Route path="/RegistroCoder" element={<RegistroCoder />} />
        <Route path="/RegistroCrafter" element={<RegistroCrafter />} /> 
        <Route path="/cuenta" element={username ? <Cuenta username={username} profilePicture={profilePicture} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function HomePage({ username }) {
  return (
    <main className="main-content">
      <section className="hero-section">
        <h1 className="hero-title-large">Aprende de</h1>
        <h1 className="hero-title-large1">una manera</h1>
        <h1>más fácil con <span className="brand-name">TimeData</span></h1>
        <div className="cta-buttons">
          {!username && (
            <>
              <Link to="/iniciarsecion" className="cta-btn">Iniciar sesión</Link>
              <Link to="/RegistroCoder" className="cta-btn">Registrarse</Link>
            </>
          )}
        </div>
        <div className="hero-image-container">
          <img src={iniciofotos} alt="Descripción de la imagen" className="hero-image" />
        </div>
      </section>

      <section className="languages-section">
        <h2>Nuestros lenguajes de programación</h2>
        <div className="languages-list">
          <div className="language-card">
            <div className="square-background">
              <img src={reacnative} alt="React Native" />
            </div>
          </div>
          <div className="language-card">
            <div className="square-background">
              <img src={java} alt="Java" />
            </div>
          </div>
          <div className="language-card">
            <div className="square-background">
              <img src={nodejs} alt="NodeJS" />
            </div>
          </div>
          <div className="language-card">
            <div className="square-background">
              <img src={reactjs} alt="ReactJS" />
            </div>
          </div>
          <div className="language-card">
            <div className="square-background">
              <img src={php} alt="PHP" />
            </div>
          </div>
          <div className="language-card">
            <div className="square-background">
              <img src={python} alt="Python" />
            </div>
          </div>
        </div>
      </section>

      <section className="challenges-section">
        <h2>Retos creados</h2>
        <div className="challenges-list">
          <div className="challenge-card">
            <h3>Calculadora</h3>
            <p>Calculadora básica creada usando HTML, CSS y JS.</p>
            <span className="rating">★★★★☆</span>
          </div>
          <div className="challenge-card">
            <h3>Par e impar</h3>
            <p>Mostrar si un número es par o impar usando HTML, CSS y JS.</p>
            <span className="rating">★★★★★</span>
          </div>
          <div className="challenge-card">
            <h3>Comprar tickets</h3>
            <p>Tienda básica para comprar tickets de cine usando HTML, CSS y JS.</p>
            <span className="rating">★★★★☆</span>
          </div>
        </div>
      </section>

      <section className="comments-section" id="comentarios">
        <h2>Comentarios</h2>
        <div className="comments-list">
          <div className="comment">
            <p><strong>Cody Fisher</strong></p>
            <p>Me gusta mucho dar mi conocimiento a los demás y me emociona estar ayudando a una buena causa.</p>
          </div>
          <div className="comment">
            <p><strong>Eleanor Pena</strong></p>
            <p>Me encanta compartir lo que sé con los demás y me llena de satisfacción saber que estoy contribuyendo a algo positivo.</p>
          </div>
          <div className="comment">
            <p><strong>Leslie Alexander</strong></p>
            <p>Disfruto mucho transmitir mis conocimientos y me emociona formar parte de una causa que hace la diferencia.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;



export default App;
