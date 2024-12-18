import fondo from "@/assets/fondo_1.png";
import Header from "@/components/header/Header.jsx";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import CustomDrawer from "../../../ChakaraUI/Drawer/CustomDrawer";
import AdminSidebar from "./Sidebar/AdminSidebar";
import AdminSidebarMovil from "./Sidebar/AdminSidebarMovil";

const LayoutAdministracion = () => {
  const user = useSelector((state) => state.user);
  const isMobile = useBreakpointValue({ base: true, md: false });
  // Check if user exists and is a superadmin (using is_staff)
  const isAllowed = user && user.is_staff;

  if (!user) {
    // Redirect to login if no user is logged in
    return <Navigate to="/" replace />;
  }

  if (!isAllowed) {
    // Redirect to home or unauthorized page if not a superadmin
    return <Navigate to="/" replace />;
  }
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
          {!isMobile && <AdminSidebar />}
          <Box px={8} py={2} w={"full"} h={"100vh"} position={"relative"}>
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
                    <Shield size={24} color="#ffffff" strokeWidth={1.5} />
                  </Box>
                }
                title={"Administracion"}
                menu={<AdminSidebarMovil />}
              />
            )}
          </Box>
        </Flex>
      </div>
    </div>
  );
};

export default LayoutAdministracion;
