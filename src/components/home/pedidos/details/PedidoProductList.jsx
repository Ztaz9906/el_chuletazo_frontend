import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import PedidorProduct from "./PedidoProducto";
export default function PedidoProductList({ productos, total }) {
  return (
    <Flex direction="column" h="100%" overflow="hidden">
      <Flex justify="space-between" w="full" align="center">
        <Text fontSize="xl" mb={4}>
          Productos
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="black">
          Total a Pagar: {total} USD
        </Text>
      </Flex>
      <Divider mb={4} borderColor="gray.300" />

      <Box
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": { width: "0px" },
          "&::-webkit-scrollbar-thumb": { background: "none" },
        }}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {productos.map((item) => (
            <PedidorProduct key={item.producto.id} item={item} />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
}
