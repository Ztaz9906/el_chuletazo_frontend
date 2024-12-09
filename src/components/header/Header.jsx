import SingUp from "@/components/auth/sing-up/SingUp";
import { useLogoutMutation } from "@/servicios/redux/api/auth/logout/logout.js";
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
  Portal,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { LogOutIcon, Settings, ShieldIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import CustomModal from "../../ChakaraUI/Modal/Modal";
import Login from "../auth/login/Login";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLogin, setIsLogin] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
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
      onClick: () => navigate("/configuracion"),
      icon: <Settings />,
    },
    user &&
      user.is_staff && {
        label: "Administracion",
        onClick: () => navigate("/administracion"),
        icon: <ShieldIcon />,
      },
    {
      label: "Desconectarse",
      onClick: handleLogout,
      icon: <LogOutIcon />,
    },
  ].filter(Boolean);

  const handleModalOpen = (isLoginMode = true) => {
    setIsLogin(isLoginMode);
    onOpen();
  };

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <Box bg="blackAlpha.300" p={2} height="56px">
        <Flex justify="space-between" align="center" height="100%">
          <Box m={2} onClick={() => navigate("/")} cursor={"pointer"}>
            <Image
              src={logo}
              alt="Logo del negocio"
              h={{ base: "2rem", md: "3rem" }} // Ajuste de tamaño del logo
              objectFit="contain"
            />
          </Box>
          <Box>
            {user ? (
              <Flex align="center" gap={2}>
                <Menu>
                  <MenuButton>
                    <Flex alignItems="center" justify="start" gap={3}>
                      <Avatar
                        size="md"
                        src=""
                        name={getInitials(user.first_name, user.last_name)}
                      />
                      <VStack align="start" spacing={0} justifyContent="center">
                        <Text
                          color="white"
                          fontWeight="medium"
                          lineHeight="16px"
                          fontSize={{ base: "sm", md: "14px" }} // Ajuste de tamaño de fuente
                        >
                          {`${user.first_name} ${user.last_name}`}
                        </Text>
                        <Text
                          color="white"
                          fontWeight="normal"
                          lineHeight="12px"
                          fontSize={{ base: "xs", md: "10px" }} // Ajuste de tamaño de fuente
                        >
                          {user.email}
                        </Text>
                      </VStack>
                      <Icon
                        viewBox="0 0 24 24"
                        boxSize="20px"
                        color="white"
                        cursor="pointer"
                      >
                        <path fill="currentColor" d="M7 10l5 5 5-5z" />
                      </Icon>
                    </Flex>
                  </MenuButton>
                  <Portal>
                    <MenuList
                      zIndex={50}
                      bg="transparent"
                      bgGradient="linear(to-l, blackAlpha.300, blackAlpha.500)"
                      border="none"
                      backdropFilter="blur(10px)"
                    >
                      {menu.map((item, index) => (
                        <MenuItem
                          key={index}
                          onClick={item.onClick}
                          size="sm"
                          color="white"
                          bg="transparent"
                          _hover={{ color: "main.600" }}
                          gap={2}
                        >
                          {item.icon}
                          {item.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Portal>
                </Menu>
              </Flex>
            ) : (
              <>
                <Button
                  className="header-button"
                  variant="ghost"
                  mr={2}
                  size="sm"
                  color="white"
                  _hover={{ bg: "transparent", color: "green" }}
                  onClick={() => handleModalOpen(true)}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  className="header-button"
                  variant="ghost"
                  size="sm"
                  color="white"
                  _hover={{ bg: "transparent", color: "green" }}
                  onClick={() => handleModalOpen(false)}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Box>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        {isLogin ? (
          <Login onClose={onClose} toggleAuthMode={toggleAuthMode} />
        ) : (
          <SingUp onClose={onClose} toggleAuthMode={toggleAuthMode} />
        )}
      </CustomModal>
    </>
  );
};

export default Header;
