import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";

export default function PedidorProduct({ item }) {
  const { producto, cantidad } = item;
  const precioUnitario = producto.default_price.unit_amount / 100;
  const subtotal = precioUnitario * cantidad;

  return (
    <Box borderWidth={1} borderRadius="lg" bg="white" shadow="sm" mb={4}>
      <Flex
        direction={{
          base: "column", // Mobile: vertical
          md: "row", // Desktop: horizontal (image left, text right)
        }}
        h={{
          base: "auto", // Auto height on mobile
          md: "300px", // Fixed height on desktop
        }}
      >
        <Flex
          direction={{
            base: "row", // Mobile: vertical
            md: "column", // Desktop: horizontal (image left, text right)
          }}
          h={{
            base: "auto", // Auto height on mobile
            md: "300px", // Fixed height on desktop
          }}
        >
          {/* Image Container */}
          <Box
            width={{
              base: "100%", // Mobile: full width
              md: "30%", // Desktop: 40% width
            }}
            height={{
              base: "auto", // Mobile: fixed height
              md: "100%", // Desktop: full height
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
              base: "80%", // Mobile: full width
              md: "70%", // Desktop: 60% width
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
          </Box>
        </Flex>
      </Flex>

      <Divider my={3} />
      <Grid
        templateColumns={{
          base: "1fr 1fr", // Mobile: single column
          md: "1fr 1fr", // Desktop: two columns
        }}
        gap={2}
        fontSize={{ base: "sm", md: "md" }}
        p={2}
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
  );
}
