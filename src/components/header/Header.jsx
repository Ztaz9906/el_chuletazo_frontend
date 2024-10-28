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
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { LogOutIcon, Settings } from "lucide-react";
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
  const { isOpen: isLogin, onToggle } = useDisclosure();
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
    {
      label: "Desconectarse",
      onClick: handleLogout,
      icon: <LogOutIcon />,
    },
  ];
  function handleModalOpen({ login }) {
    if (login && isLogin) {
      onOpen();
    } else {
      onToggle();
      onOpen();
    }
  }
  return (
    <>
      <Box bg="blackAlpha.300" p={2} height="56px">
        <Flex justify="space-between" align="center" height="100%">
          <Box m={2} onClick={() => navigate("/")}>
            <Image
              src={logo}
              alt="Logo del negocio"
              h="3rem"
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
                          fontSize="14px"
                        >
                          {`${user.first_name} ${user.last_name}`}
                        </Text>
                        <Text
                          color="white"
                          fontWeight="normal"
                          lineHeight="12px"
                          fontSize="10px"
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
                  <MenuList zIndex={50} bg="blackAlpha.300" border="none">
                    {menu.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={item.onClick}
                        size="sm"
                        color="white"
                        bg="transparent"
                        _hover={{ color: "green" }}
                        gap={2}
                      >
                        {item.icon}
                        {item.label}
                      </MenuItem>
                    ))}
                  </MenuList>
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
                  onClick={() => handleModalOpen({ login: true })}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  className="header-button"
                  variant="ghost"
                  size="sm"
                  color="white"
                  _hover={{ bg: "transparent", color: "green" }}
                  onClick={() => handleModalOpen({ login: false })}
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
          <Login onClose={onClose} onSignUpOpen={onToggle} />
        ) : (
          <SingUp onClose={onClose} onLoginOpen={onToggle} />
        )}
      </CustomModal>
    </>
  );
};

export default Header;
