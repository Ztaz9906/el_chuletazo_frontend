import fondo from "@/assets/fondo_1.png";
import Header from "@/components/header/Header.jsx";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";

const LayOutConfiguracion = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
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

      <Flex
        w="full"
        backgroundImage="url('/fondo_2.png')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {!isMobile && <Sidebar />}
        <Box px={8} py={2} w={"full"} h={"100vh"}>
          <Outlet />
        </Box>
      </Flex>
    </div>
  );
};

export default LayOutConfiguracion;
