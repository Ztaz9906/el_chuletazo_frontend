import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { RiKeyLine, RiUser6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SideBarMovil = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const links = [
    {
      label: "Datos Personales",
      path: "/configuracion/datos-personales",
      icon: RiUser6Line,
    },
    {
      label: "Cambio de Contraseña",
      path: "/configuracion/cambiar-contrasenna",
      icon: RiKeyLine,
    },
    {
      label: "Mis Destinatarios",
      path: "/configuracion/destinatarios",
      icon: PiUsersThree,
    },
  ];
  const userName = user ? `${user.first_name} ${user.last_name}` : "Usuario";

  return (
    <>
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top={-6}
        right={-6}
        width="32"
        height="32"
        bg="green.100"
        borderRadius="full"
        filter="blur(48px)"
        opacity={0.2}
        zIndex={1}
      />
      <Box
        position="absolute"
        bottom={-6}
        left={-6}
        width="32"
        height="32"
        bg="green.100"
        borderRadius="full"
        filter="blur(48px)"
        opacity={0.2}
        zIndex={1}
      />

      <VStack spacing={4} align="center" position="relative" zIndex={10}>
        <Flex
          width="16"
          height="16"
          bg={"gray.500"}
          borderRadius="lg"
          boxShadow="lg"
          align="center"
          justify="center"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
          mb={4}
        >
          <Icon as={FaUser} color="white" boxSize={8} />
        </Flex>

        <Text
          fontSize="xl"
          fontWeight="medium"
          color="white"
          textAlign="center"
          px={2}
          mb={8}
        >
          {userName}
        </Text>

        <VStack spacing={3} width="full" align={"flex-start"}>
          {links.map(({ label, path, icon }, index) => (
            <Flex
              as={Link}
              to={path}
              key={index}
              align="center"
              p={3}
              bg="transparent"
              color={location.pathname === path ? "main.500" : "white"}
              borderBottom="1px solid"
              borderColor="gray.300"
              _hover={{
                color: "main.500",
                transform: "scale(1.02)",
              }}
              transition="all 0.2s"
              w={"full"}
            >
              <Icon as={icon} boxSize={5} mr={2} />
              <Text fontSize="md" fontWeight="medium">
                {label}
              </Text>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </>
  );
};

export default SideBarMovil;
