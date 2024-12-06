import Product from "@/components/home/pedidos/Stepper/steps/productos/Product.jsx";
import { Box, Divider, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProductsList({ hasTitle = true }) {
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
        {hasTitle && (
          <Text
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight="medium"
            color="main.600"
          >
            Productos
          </Text>
        )}
        <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" color="black">
          Total a Pagar: {total.toFixed(2)} US$
        </Text>
      </HStack>
      <Divider mb={4} borderColor="gray.300" />
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
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2} overflowY={"auto"}>
          {productos.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
}
