import fondo from "@/assets/fondo_1.png";
import Header from "@/components/header/Header.jsx";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import NavBar from "../nav_bar/NavBar";

const BackPrincipal = () => {
  return (
    <Box
      backgroundImage={`url(${fondo})`}
      backgroundSize="cover"
      backgroundPosition="center"
      height="50vh"
      minHeight="300px"
      display="flex"
      flexDirection="column"
      color="white"
    >
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        backdropFilter="blur(10px)"
      >
        <Header />
      </Box>
      <VStack
        flex={1}
        justifyContent="center"
        alignItems="flex-start"
        p={{ base: 4, md: 8 }}
        spacing={4}
      >
        <Heading
          as="h1"
          color="white"
          fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          lineHeight="1.2"
        >
          Adquiere de forma rápida y sencilla
          <br />
          los productos que necesita
        </Heading>
        <Text color="gray.300" fontSize="14px">
          En nuestra tienda online usted podrá comprar y enviar productos a sus
          familiares y amigos en Cuba
        </Text>
      </VStack>
      <NavBar />
    </Box>
  );
};

export default BackPrincipal;
