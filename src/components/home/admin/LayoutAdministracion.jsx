import fondo from "@/assets/fondo_1.png";
import Header from "@/components/header/Header.jsx";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const LayoutAdministracion = () => {
  const user = useSelector((state) => state.user);
  console.log("ProtectedRoute -> user", user);
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
