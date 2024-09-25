import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Product from "@/components/home/pedidos/Stepper/steps/productos/Product.jsx";

export default function ProductsList() {
  const productos = useSelector((state) => state.cart.products);
  const total = productos.reduce((sum, product) => {
    return sum + (product.default_price.unit_amount / 100) * product.quantity;
  }, 0);

  return (
    <Flex direction="column" h="100%" overflow="hidden">
      <Box
        p={1}
        position="sticky"
        top={0}
        bg="white"
        zIndex={1}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="20px" fontWeight="semiboldbold" mb={1}>
          Pagar a EL Chuletazo
        </Text>
        <Text fontSize="24px" fontWeight="bold" color="green.500">
          {total.toFixed(2)} US$
        </Text>
      </Box>
      <Box
        overflowY="auto"
        flex={1}
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "none",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "none",
          },
        }}
      >
        <VStack spacing={4} align="stretch" w="full" mx="auto" p={4}>
          <SimpleGrid columns={3} spacing={4}>
            {productos.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  );
}