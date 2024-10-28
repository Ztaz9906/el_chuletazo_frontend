import ModalCart from "@/components/home/Productos/ModalCart.jsx";
import { Box, Link as ChakraLink, HStack, Button, Icon } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListTodo } from 'lucide-react';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { label: "Productos", path: "/productos" },
    { label: "Pagos", path: "/info_pagos" },
    { label: "Envíos", path: "/info_envios" },
    { label: "Preguntas Frecuentes", path: "/info_preguntas-frecuentes" },
  ];

  const handleOrdersClick = () => {
    navigate('/pedidos'); 
  };

  return (
    <Box bg="rgba(0, 0, 0, 0.2)" w="full">
      <HStack spacing={6} justify="space-between" align="center" px={4}>
        <HStack spacing={6}>
          {links.map(({ label, path }, index) => (
            <ChakraLink
              as={Link}
              to={path}
              key={index}
              bg={location.pathname === path ? "rgba(255, 255, 255, 0.15)" : "transparent"}
              color={location.pathname === path ? "green.400" : "white"}
              fontWeight={location.pathname === path ? "bold" : "normal"}
              px={4}
              py={2}
              display="flex"
              alignItems="center"
              transition="all 0.2s ease-in-out"
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: "rgba(255, 255, 255, 0.1)",
                transform: "scale(0.95)",
                opacity: 0,
                transition: "all 0.2s ease-in-out",
              }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.2)",
                color: "green.300",
                transform: "translateY(-1px)",
                _before: {
                  transform: "scale(1)",
                  opacity: 1,
                },
              }}
              _active={{
                transform: "scale(0.98)",
                bg: "rgba(255, 255, 255, 0.25)",
              }}
              h="10"
            >
              {label}
            </ChakraLink>
          ))}
        </HStack>
        <HStack spacing={2} ml="auto">
          <Button
            bg="transparent"
            onClick={handleOrdersClick}
            color="white"
            borderBottom="2px solid transparent"
            borderRadius="0"
            _hover={{
              borderBottom: "2px solid",
              borderColor: "main.10",
              color: "white",
            }}
            h="10"
            leftIcon={<Icon as={ListTodo} />}
          >
            Mis Pedidos
          </Button>
          <ModalCart />
        </HStack>
      </HStack>
    </Box>
  );
}

export default NavBar;