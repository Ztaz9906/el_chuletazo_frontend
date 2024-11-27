import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/header/Header.jsx";
import fondo from "@/assets/fondo_1.png";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const LayoutAdministracion = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <Box
        backgroundImage={`url(${fondo})`}
        backgroundSize="cover"
        backgroundPosition="center"
        h={"56px"}
      >
        <Header />
      </Box>
      <div className="flex-grow">
        <Flex
          w="full"
          backgroundImage="url('/fondo_2.png')"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <AdminSidebar />
          <Box px={8} py={2} w={"full"} h={"100vh"}>
            <Outlet />
          </Box>
        </Flex>
      </div>
    </div>
  );
};

export default LayoutAdministracion;