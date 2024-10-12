import React, { useState } from 'react';
import './SubirReto.css';

const Subirreto = () => {
  const [setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Aquí puedes agregar la lógica para manejar la carga del archivo
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      // Aquí puedes agregar la lógica para manejar la carga del archivo
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="subirreto">
      <h1 className="header-text">Sube aquí el <span className="underline-text">archivo del reto</span></h1>
      <div 
        className="file-upload-area" 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
      >
        <label className="upload-button" htmlFor="file-upload">
          <span>Cargar archivo</span>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <div className="drag-text">O arrastra aquí un archivo</div>
      </div>
      <div className="vector-images">
        <img className="vector-img" alt="" src="Vector 3.svg" />
        <img className="vector-img" alt="" src="Vector 4.svg" />
      </div>
    </div>
  );
};

export default Subirreto;
