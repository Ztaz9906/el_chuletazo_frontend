import DestinatariosTable from "@/components/home/configuration/destinatarios/Table/DestinatariosTable";
import { useGetDestinatarioQuery } from "@/servicios/redux/api/Destinatarios";
import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import DestinatarioModal from "../../../pedidos/Stepper/steps/destinatario/DestinatarioModal";

export default function ListaDestinatarios() {
  const { data, isLoading, isError, error } = useGetDestinatarioQuery();

  return (
    <Box height="100vh">
      <HStack w="full" justify="space-between" p={2}>
        <Text fontSize="2xl" fontWeight="medium" color="main.600">
          Mis Destinatarios
        </Text>
        <DestinatarioModal />
      </HStack>
      <Divider mb={4} borderColor="gray.300" />
      <Box bg={"white"}>
        <DestinatariosTable destinatarios={data || []} isLoading={isLoading} />
      </Box>
    </Box>
  );
}
