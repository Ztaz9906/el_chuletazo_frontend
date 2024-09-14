import React from 'react';
import '@/components/Header.css'; // Importa los estilos
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo del negocio" className="logo" />
      </div>
      <div className="button-container">
        <button className="header-button">Inicio</button>
        <button className="header-button">Registrarse</button>
      </div>
    </header>
  );
};

export default Header;
