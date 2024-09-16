import '@/components/header/Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className=" bg-black bg-opacity-30 flex justify-between p-2">
      <div className="logo-container m-2">
        <img src={logo} alt="Logo del negocio" className="logo w-13 h-10 object-contain"/>
      </div>
      <div className="button-container">
        <button className="header-button">Iniciar Sesión</button>
        <button className="header-button">Registrarse</button>
      </div>
    </header>
  );
};

export default Header;
