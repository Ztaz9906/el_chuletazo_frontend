import '@/components/Header.css';
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    <header className=" bg-black bg-opacity-60 flex justify-between p-2">
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
