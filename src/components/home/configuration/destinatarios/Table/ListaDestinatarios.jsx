import DestinatariosTable from "@/components/home/configuration/destinatarios/Table/DestinatariosTable";
import { useGetDestinatarioQuery } from "@/servicios/redux/api/Destinatarios";
import { Box, VStack, HStack, Text, Divider } from "@chakra-ui/react";
import DestinatarioModal from "../../../pedidos/Stepper/steps/destinatario/DestinatarioModal";

export default function ListaDestinatarios() {
  const { data, isLoading, isError, error } = useGetDestinatarioQuery();

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <VStack 
      align="stretch" 
      bg="rgba(255, 255, 255, 0.6)" 
      p={4} 
      boxShadow="lg" 
      mt={4} 
      h="calc(100vh - 100px)"
    >      
      <HStack w="full" justify="space-between">
        <Text fontSize="2xl" fontWeight="medium" color="main.600">
            Mis Destinatarios
        </Text>
        <DestinatarioModal />
      </HStack>
      <Divider mb={4} borderColor="gray.300" />      
      {data && (
        <Box w="full" overflow="auto" flex="1">
          <DestinatariosTable destinatarios={data} />
        </Box>
      )}
    </VStack>
  );
}