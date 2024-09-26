import { Box } from "@chakra-ui/react";
import Footer from "@/components/footer/Footer.jsx";
import Header from "@/components/header/Header.jsx";
import fondo from "@/assets/fondo_1.png";
import MainStepper from "@/components/home/pedidos/Stepper/MainStepper.jsx";

const LayoutPedidos = () => {
  return (
    <div className="layout flex flex-col min-h-screen">
      <Box
        backgroundImage={`url(${fondo})`}
        backgroundSize="cover"
        backgroundPosition="center"
        h={"56px"}
      >
        <Header />
      </Box>
      <div className="flex-grow">
        <Box
          overflowY="auto"
          w="full"
          backgroundImage="url('/src/assets/fondo_2.png')"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <MainStepper />
          <Footer />
        </Box>
      </div>
    </div>
  );
};

export default LayoutPedidos;
