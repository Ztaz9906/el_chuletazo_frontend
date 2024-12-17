import { useState } from "react";
import { Button, VStack, Icon, Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaBox, FaMoneyCheck, FaShippingFast, FaQuestionCircle } from "react-icons/fa";

const DrawerMenu = ({ onClose }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const links = [
    { label: "Productos", path: "/productos", icon: FaBox },
    { label: "Pagos", path: "/info_pagos", icon: FaMoneyCheck },
    { label: "Envíos", path: "/info_envios", icon: FaShippingFast },
    { label: "Preguntas Frecuentes", path: "/info_preguntas-frecuentes", icon: FaQuestionCircle },
  ];

  const handleButtonClick = (path) => {
    setActivePath(path);
    onClose();
  };

  return (
    <VStack spacing={4} align="stretch" bg="transparent">
      {links.map(({ label, path, icon }, index) => (
        <Flex
          as={Link}
          to={path}
          key={index}
          align="center"
          p={3}
          bg="transparent"
          color={activePath === path ? "main.500" : "white"}
          borderBottom="1px solid"
          borderColor="gray.300"
          onClick={() => handleButtonClick(path)}
          _hover={{
            color: "main.500",
            transform: "scale(1.02)",
          }}
          transition="all 0.2s"
        >
          <Icon as={icon} boxSize={5} mr={2} />
          <Text fontSize="md" fontWeight="medium">
            {label}
          </Text>
        </Flex>
      ))}
    </VStack>
  );
};

export default DrawerMenu;