import { Box } from "@chakra-ui/react";
import Footer from "@/components/footer/Footer.jsx";
import CreatePedido from "@/components/home/pedidos/CreatePedido.jsx";
import Header from "@/components/header/Header.jsx";
import fondo from "@/assets/fondo_1.png";

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
          <CreatePedido />
          <Footer />
        </Box>
      </div>
    </div>
  );
};

export default LayoutPedidos;
