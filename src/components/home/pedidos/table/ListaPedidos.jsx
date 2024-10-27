import PedidosTable from "@/components/home/pedidos/table/PedidosTable.jsx";
import { useGetPedidosQuery } from "@/servicios/redux/api/Pedidos/index.js";
import { Box, Heading } from "@chakra-ui/react";

export default function ListaPedidos() {
  const { data, isLoading, isError, error } = useGetPedidosQuery();

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Box height="100vh">
      <Heading
        as="h1"
        mb={4}
        fontSize="32px"
        fontWeight={"medium"}
        color="#51616D"
      >
        Lista de Pedidos
      </Heading>

      <Box bg={"white"}>
        <PedidosTable pedidos={data || []} isLoading={isLoading} />
      </Box>
    </Box>
  );
}
