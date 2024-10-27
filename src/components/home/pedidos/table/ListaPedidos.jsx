import PedidosTable from "@/components/home/pedidos/table/PedidosTable.jsx";
import { useGetPedidosQuery } from "@/servicios/redux/api/Pedidos/index.js";
import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function ListaPedidos() {
  const { data, isLoading, isError, error } = useGetPedidosQuery();

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <VStack
      h="calc(100vh - 100px)"
      bg="rgba(255, 255, 255, 0.6)"
      p={4}
      boxShadow="lg"
      mt={4}
      borderRadius={"5px"}
    >
      <HStack w="full" justify="space-between" mt={2}>
        <Text fontSize="2xl" fontWeight="medium" color="main.600">
          Lista de Pedidos
        </Text>
      </HStack>
      <Divider mb={4} borderColor="gray.300" />
      <Box borderWidth={1} borderRadius={"5px"} borderColor={"gray.300"}>
        <PedidosTable pedidos={data || []} isLoading={isLoading} />
      </Box>
    </VStack>
  );
}
