import Header from "@/components/header/Header.jsx";
import fondo from "@/assets/fondo_1.png";
import { Box } from "@chakra-ui/react";

const BackPrincipal = ({ children }) => {
  return (
    <Box
      backgroundImage={`url(${fondo})`}
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="50vh"
      display="flex"
      flexDirection={"column"}
      color={"white"}
    >
      <Header />
      <div className="flex-grow flex flex-col justify-center p-4 md:p-8 relative z-10">
        <h1 className="text-white text-xl sm:text-2xl md:text-4xl md:leading-[50px] leading-[50px] mb-4">
          Adquiere de forma rápida y sencilla
          <br />
          los productos que necesita
          <br />
        </h1>
        <h1 className="text-gray-300 text-[14px]">
          En nuestra tienda online usted podrá comprar y enviar productos a sus
          familiares y amigos en Cuba
        </h1>
      </div>
      {children}
    </Box>
  );
};

export default BackPrincipal;
