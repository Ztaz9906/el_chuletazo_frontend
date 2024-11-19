import { Button, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const DrawerMenu = ({ onClose }) => {
  const location = useLocation();

  const links = [
    { label: "Productos", path: "/productos" },
    { label: "Pagos", path: "/info_pagos" },
    { label: "Envíos", path: "/info_envios" },
    { label: "Preguntas Frecuentes", path: "/info_preguntas-frecuentes" },
  ];

  return (
    <VStack spacing={4} align="stretch">
      {links.map(({ label, path }, index) => (
        <Button
          as={Link}
          to={path}
          key={index}
          variant="ghost"
          color={location.pathname === path ? "green.400" : "gray.800"}
          fontWeight={location.pathname === path ? "bold" : "normal"}
          onClick={onClose}
          justifyContent="flex-start"
          _hover={{
            bg: "gray.100",
            color: "green.500",
          }}
        >
          {label}
        </Button>
      ))}
    </VStack>
  );
};

export default DrawerMenu;
