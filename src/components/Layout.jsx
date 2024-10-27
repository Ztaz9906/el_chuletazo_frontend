import CustomGoogleLogin from "@/components/auth/google/GoogleLogin.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import BackPrincipal from "@/components/header/BackPrincipal.jsx";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const user = useSelector((state) => state.user);

  return (
    <Flex flexDirection="column" minHeight="100vh">
      {!user && <CustomGoogleLogin useOneTap={true} />}
      <Box flexShrink={0}>
        <BackPrincipal />
      </Box>
      <Box
        flex={1}
        overflowY="auto"
        backgroundImage="url('/fondo_2.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        py={8}
        px={14}
      >
        <Outlet />
      </Box>
      <Box flexShrink={0}>
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
