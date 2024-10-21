import DestinatariosTable from "@/components/home/configuration/destinatarios/Table/DestinatariosTable";
import { useGetDestinatarioQuery } from "@/servicios/redux/api/Destinatarios";
import { Box, Heading, HStack } from "@chakra-ui/react";
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
    <Box height="100vh" p={4}>
      <HStack w={"full"} justify={"space-between"}>
        <Heading
          as="h1"
          mb={4}
          fontSize="32px"
          fontWeight={"medium"}
          color="#51616D"
        >
          Lista de Destinatarios
        </Heading>
        <DestinatarioModal />
      </HStack>
      {data && (
        <Box bg={"white"}>
          <DestinatariosTable destinatarios={data} />
        </Box>
      )}
    </Box>
  );
}
