import { useSelector } from "react-redux";
import { Box, Flex, HStack, SimpleGrid, Text, VStack, Divider } from "@chakra-ui/react";
import Product from "@/components/home/pedidos/Stepper/steps/productos/Product.jsx";
import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function ProductsList({hasTitle = true}) {
  const { setFieldValue, errors, validateField, values } = useFormikContext();
  const productos = useSelector((state) => state.cart.products);
  const total = productos.reduce((sum, product) => {
    return sum + (product.default_price.unit_amount / 100) * product.quantity;
  }, 0);
  const products = productos.map((product) => {
    return {
      stripe_product_id: product.stripe_product_id,
      price: product.default_price.stripe_price_id,
      quantity: product.quantity,
    };
  });
  useEffect(() => {
    setFieldValue("total", total);
    setFieldValue("productos", products);
    validateField("productos");
  }, [errors]);
  return (
    <Flex direction="column" h="100%" overflow="hidden">
      <HStack justify="space-between" w="full" mt={2}>
        {hasTitle && 
        (<Text fontSize="2xl" fontWeight="medium" color="main.600">
          Productos
        </Text>)}
        
        <Text fontSize="xl" fontWeight="bold" color="black">
          Total a Pagar: {total.toFixed(2)} US$
        </Text>
      </HStack>
      <Divider mb={4} borderColor="gray.300" />
      <Box borderWidth={1} borderRadius="lg" p={6} mt={6} bg="white" shadow="sm">
      <Flex
        overflowY="auto"
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
        alignItems={"center"}
        h={"100%"}
      >
        {errors.productos ? (
          <Box
            border
            borderWidth={"1px"}
            bg={"red.100"}
            borderColor={"red.400"}
            borderRadius={"5px"}
            display={"flex"}
            justifyContent={"center"}
            textAlign={"center"}
            textColor={"red.600"}
            w={"100%"}
          >
            {errors.productos}
          </Box>
        ) : (
          <VStack spacing={4} align="stretch" w="full" mx="auto" p={4}>
            <SimpleGrid columns={3} spacing={4}>
              {productos.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </SimpleGrid>
          </VStack>
        )}
      </Flex>
      </Box>
    </Flex>
  );
}
