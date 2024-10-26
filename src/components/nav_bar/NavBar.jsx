import ModalCart from "@/components/home/Productos/ModalCart.jsx";
import { Box, Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const links = [
    { label: "Productos", path: "/productos" },
    { label: "Pagos", path: "/info_pagos" },
    { label: "Envíos", path: "/info_envios" },
    { label: "Preguntas Frecuentes", path: "/info_preguntas-frecuentes" },
  ];

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
                borderRadius: "xl",
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
        <Box ml="auto">
          <ModalCart />
        </Box>
      </HStack>
    </Box>
  );
}

export default NavBar;