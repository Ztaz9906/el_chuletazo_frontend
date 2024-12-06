import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function PedidoProductsMobile({ item }) {
  const { producto, cantidad } = item;
  const precioUnitario = producto.default_price.unit_amount / 100;
  const subtotal = precioUnitario * cantidad;
  return (
    <Flex
      w="full"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <Box w="100px" h="auto" mr={3} flexShrink={0}>
        <Image
          objectFit="cover"
          w="100%"
          h="100%"
          src={producto.image}
          alt={producto.name}
        />
      </Box>
      <Box flex={1} p={1}>
        <Text fontWeight="bold" fontSize="sm">
          {producto.name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {producto.description}
        </Text>
        <Text fontSize="xs" color="gray.600">
          {cantidad} x ${(producto.default_price.unit_amount / 100).toFixed(2)}{" "}
          {producto.default_price.currency.toUpperCase()}/lbs
        </Text>
        <Box textAlign="right">
          <Text fontWeight="bold" fontSize="sm">
            ${subtotal.toFixed(2)}{" "}
            {producto.default_price.currency.toUpperCase()}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
