import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function Product({ product }) {
  return (
    <Flex w="full" alignItems="center" mb={4}>
      <Box w="100px" h="60px" mr={3} flexShrink={0}>
        <Image
          objectFit="cover"
          w="100%"
          h="100%"
          src={product.image}
          alt={product.name}
        />
      </Box>
      <Box flex={1}>
        <Text fontWeight="bold" fontSize="sm">
          {product.name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {product.description}
        </Text>
        <Text fontSize="xs" color="gray.600">
          {product.quantity} x $
          {(product.default_price.unit_amount / 100).toFixed(2)}{" "}
          {product.default_price.currency.toUpperCase()}/unidad
        </Text>
      </Box>
      <Box textAlign="right">
        <Text fontWeight="bold" fontSize="sm">
          $
          {(
            (product.quantity * product.default_price.unit_amount) /
            100
          ).toFixed(2)}{" "}
          {product.default_price.currency.toUpperCase()}
        </Text>
      </Box>
    </Flex>
  );
}
