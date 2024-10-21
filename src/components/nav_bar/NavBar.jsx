import ModalCart from "@/components/home/Productos/ModalCart.jsx";
import { Box, Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const links = [
    { label: "Productos", path: "/productos" },
    { label: "Pagos", path: "/pagos" },
    { label: "Envios", path: "/envios" },
    { label: "Preguntas Frecuentes", path: "/preguntas-frecuentes" },
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
              bg="transparent"
              color={location.pathname === path ? "green.500" : "white"}
              borderBottom="2px solid transparent"
              borderRadius="0"
              display="flex"
              alignItems="center"
              _hover={{
                borderBottom: "2px solid",
                borderColor: "green.500",
                color: "green.500",
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
