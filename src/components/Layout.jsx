import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CustomGoogleLogin from "../components/auth/google/GoogleLogin.jsx";
import BackPrincipal from "../components/header/BackPrincipal.jsx";
import NavBar from "../components/nav_bar/NavBar.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  const user = useSelector((state) => state.user);

  console.log(user);

  return (
    <div className="layout flex flex-col h-screen">
      {!user && <CustomGoogleLogin useOneTap={true} />}
      <div className="fixed top-0 left-0 right-0 z-10">
        <BackPrincipal>
          <NavBar />
        </BackPrincipal>
      </div>
      <div className="flex-grow overflow-auto mt-[347px] mb-[120px]">
        <Box
          w="full"
          h="full"
          backgroundImage="url('/src/assets/fondo_2.png')"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Outlet />
        </Box>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
