import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { LogOutIcon, Settings } from "lucide-react";
import { useLogoutMutation } from "@/servicios/api/auth/logout/logout.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();

      toast({
        title: response.detail,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error al intentar desconectarse:", error);
    }
  };

  const getInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      const firstLetter = firstName[0].toUpperCase();
      const secondLetter = lastName[0].toUpperCase();
      return `${firstLetter}${secondLetter}`;
    } else if (firstName) {
      return firstName[0].toUpperCase();
    } else if (lastName) {
      return lastName[0].toUpperCase();
    }
    return "U";
  };

  const menu = [
    {
      label: "Configuración",
      onClick: () => {},
      icon: <Settings />,
    },
    {
      label: "Desconectarse",
      onClick: handleLogout,
      icon: <LogOutIcon />,
    },
  ];

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
