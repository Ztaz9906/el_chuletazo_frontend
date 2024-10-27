import DestinatariosTable from "@/components/home/configuration/destinatarios/Table/DestinatariosTable";
import { useGetDestinatarioQuery } from "@/servicios/redux/api/Destinatarios";
import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import DestinatarioModal from "../../../pedidos/Stepper/steps/destinatario/DestinatarioModal";

export default function ListaDestinatarios() {
  const { data, isLoading } = useGetDestinatarioQuery();

  return (
    <VStack
      height="100vh"
      bg="rgba(255, 255, 255, 0.6)"
      p={4}
      boxShadow="lg"
      mt={4}
      borderRadius={"5px"}
    >
      <HStack w="full" justify="space-between" mt={2}>
        <Text fontSize="2xl" fontWeight="medium" color="main.600">
          Mis Destinatarios
        </Text>
        <DestinatarioModal />
      </HStack>
      <Divider mb={4} borderColor="gray.300" />
      <Box bg={"white"}>
        <DestinatariosTable destinatarios={data || []} isLoading={isLoading} />
      </Box>
    </VStack>
  );
}
