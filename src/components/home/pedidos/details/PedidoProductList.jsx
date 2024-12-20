import {
  Box,
  Divider,
  Flex,
  Grid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import PedidorProduct from "./PedidoProducto";
import PedidoProductsMobile from "./PedidoProductsMobile";
export default function PedidoProductList({ productos, total }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex direction="column" h="100%" overflow="hidden">
      <Flex justify="space-between" w="full" align="center" gap={2}>
        <Text fontSize="xl">Productos </Text>
        <Text fontSize={["md", "xl", "2xl"]} fontWeight="bold" color="black">
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
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={2}>
          {productos.map((item) =>
            isMobile ? (
              <PedidoProductsMobile key={item.producto.id} item={item} />
            ) : (
              <PedidorProduct key={item.producto.id} item={item} />
            )
          )}
        </Grid>
      </Box>
    </Flex>
  );
}
