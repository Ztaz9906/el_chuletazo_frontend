import fondo from "@/assets/fondo_1.png";
import Header from "@/components/header/Header.jsx";
import NavBar from "@/components/nav_bar/NavBar.jsx";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const ProductLayout = () => {
  return (
    <Flex flexDirection="column" height="100vh" overflow="hidden">
      <Box
        backgroundImage={`url(${fondo})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Header />
        <NavBar />
      </Box>
      <Box
        flex={1}
        overflowY="auto"
        backgroundImage="url('/src/assets/fondo_2.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        p={4}
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default ProductLayout;
