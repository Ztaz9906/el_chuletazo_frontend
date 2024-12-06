import fondo from "@/assets/fondo_1.png";
import Header from "@/components/header/Header.jsx";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Settings } from "lucide-react";
import { Outlet } from "react-router-dom";
import CustomDrawer from "../../../../ChakaraUI/Drawer/CustomDrawer";
import Sidebar from "../SideBar/Sidebar";
import SideBarMovil from "../SideBar/SideBarMovil";

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
        position="relative"
      >
        {isMobile ? null : <Sidebar />}

        <Box px={[4, 8]} py={2} w={"full"} h={"100vh"} position="relative">
          <Outlet />

          {isMobile && (
            <CustomDrawer
              trigger={
                <Box
                  bg="main.500"
                  position="fixed"
                  bottom="20px"
                  left="20px"
                  zIndex={1000}
                  borderRadius="full"
                  p={3}
                  boxShadow="lg"
                  cursor="pointer"
                >
                  <Settings size={24} color="#ffffff" strokeWidth={1.5} />
                </Box>
              }
              title={"Configuracion"}
              menu={<SideBarMovil />}
            />
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default LayOutConfiguracion;
