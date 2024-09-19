import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import BackPrincipal from "@/components/header/BackPrincipal.jsx";
import NavBar from "@/components/nav_bar/NavBar.jsx";
import Footer from "@/components/footer/Footer.jsx";
import CustomGoogleLogin from "@/components/auth/google/GoogleLogin.jsx";

const Layout = () => {
  return (
    <div className="layout flex flex-col min-h-screen">
      <CustomGoogleLogin useOneTap={true} />
      <BackPrincipal>
        <NavBar />
      </BackPrincipal>
      <div className="flex-grow">
        <Box
          overflowY="auto"
          w="full"
          backgroundImage="url('/src/assets/fondo_2.png')"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Outlet />
          <Footer />
        </Box>
      </div>
    </div>
  );
};

export default Layout;
