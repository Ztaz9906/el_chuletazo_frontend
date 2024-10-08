import { useSelector } from "react-redux";
import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Product from "@/components/home/pedidos/Stepper/steps/productos/Product.jsx";
import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function ProductsList() {
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
      <Box
        p={1}
        position="sticky"
        top={0}
        zIndex={1}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="20px" fontWeight="semiboldbold" mb={1}>
          Pagar a El Chuletazo
        </Text>
        <Text fontSize="24px" fontWeight="bold" color="green.500">
          {total.toFixed(2)} US$
        </Text>
      </Box>
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
    </Flex>
  );
}
