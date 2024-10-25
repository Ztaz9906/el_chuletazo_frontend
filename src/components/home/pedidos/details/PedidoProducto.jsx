import { Box, Divider, Grid, Text } from "@chakra-ui/react";

export default function PedidorProduct({ item }) {
  const { producto, cantidad } = item;
  const precioUnitario = producto.default_price.unit_amount / 100;
  const subtotal = precioUnitario * cantidad;

  return (
    <Box borderWidth={1} borderRadius="lg" bg="white" shadow="sm">
      <Box h="200px">
        <img
          src={producto.image}
          alt={producto.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box p={4}>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          {producto.name}
        </Text>
        {producto.description && (
          <Text fontSize="sm" color="gray.600" mb={2}>
            {producto.description}
          </Text>
        )}
        <Divider my={2} />
        <Grid templateColumns="1fr 1fr" gap={2} fontSize="sm">
          <Text>Precio:</Text>
          <Text textAlign="right">${precioUnitario}</Text>
          <Text>Cantidad:</Text>
          <Text textAlign="right">{cantidad}</Text>
          <Text fontWeight="bold">Subtotal:</Text>
          <Text textAlign="right" fontWeight="bold">
            ${subtotal}
          </Text>
        </Grid>
      </Box>
    </Box>
  );
}
