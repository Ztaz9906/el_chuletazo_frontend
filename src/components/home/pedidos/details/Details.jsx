import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetPedidoByIdQuery } from "../../../../servicios/redux/api/Pedidos";
import PedidoDetails from "./PedidoDetail";

export default function Details() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPedidoByIdQuery(id);

  if (isLoading) {
    return (
      <Box p={4}>
        <Text>Cargando detalles del pedido...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4} bg="red.50" color="red.600" borderRadius="md">
        Error al cargar los detalles del pedido
      </Box>
    );
  }

  return <PedidoDetails data={data} />;
}
