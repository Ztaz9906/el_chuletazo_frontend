import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import BackPrincipal from "@/components/header/BackPrincipal.jsx";
import NavBar from "@/components/nav_bar/NavBar.jsx";
import Footer from "@/components/footer/Footer.jsx";
import CustomGoogleLogin from "@/components/auth/google/GoogleLogin.jsx";

const Layout = () => {
  const user = useSelector((state) => state.user);

  console.log(user);

  return (
    <div className="layout flex flex-col min-h-screen">
      {!user && <CustomGoogleLogin useOneTap={true} />}
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
