import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import BackPrincipal from "@/components/header/BackPrincipal.jsx";
import MyTabs from "@/components/tab_bar/tab_bar.jsx";
import Footer from "@/components/footer/Footer.jsx";

const Layout = () => {
  const user = useSelector((state) => state.user);

  console.log(user);

  return (
    <div className="layout flex flex-col min-h-screen">
      <BackPrincipal>
        <MyTabs />
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
