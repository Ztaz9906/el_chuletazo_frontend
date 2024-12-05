import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";

export default function PedidorProduct({ item }) {
  const { producto, cantidad } = item;
  const precioUnitario = producto.default_price.unit_amount / 100;
  const subtotal = precioUnitario * cantidad;

  return (
    <Box borderWidth={1} borderRadius="lg" bg="white" shadow="sm" mb={4}>
      <Flex
        direction={{
          base: "row", // Desktop: horizontal (image left, text right)
          md: "column", // Mobile: vertical
        }}
        h={{
          base: "300px", // Fixed height on desktop
          md: "auto", // Auto height on mobile
        }}
      >
        {/* Image Container */}
        <Box
          width={{
            base: "40%", // Desktop: 40% width
            md: "100%", // Mobile: full width
          }}
          height={{
            base: "100%", // Desktop: full height
            md: "250px", // Mobile: fixed height
          }}
        >
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

        {/* Product Details Container */}
        <Box
          p={4}
          width={{
            base: "60%", // Desktop: 60% width
            md: "100%", // Mobile: full width
          }}
        >
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="semibold"
            mb={2}
          >
            {producto.name}
          </Text>

          {producto.description && (
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={4}>
              {producto.description}
            </Text>
          )}

          <Divider my={3} />

          <Grid
            templateColumns="1fr 1fr"
            gap={2}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Text>Precio:</Text>
            <Text textAlign="right">${precioUnitario.toFixed(2)}</Text>

            <Text>Cantidad:</Text>
            <Text textAlign="right">{cantidad}</Text>

            <Text fontWeight="bold">Subtotal:</Text>
            <Text textAlign="right" fontWeight="bold">
              ${subtotal.toFixed(2)}
            </Text>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
}
