import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import CustomNumberInput from "../CustomNumberInput";

export function renderProductCard(
  producto,
  setQuantity,
  quantity,
  handleAddToCart
) {
  return (
    <>
      <Box p={2} h="150px" w="full">
        <Image
          objectFit="contain"
          w="100%"
          h="100%"
          src={producto.image}
          alt={producto.name}
        />
      </Box>

      <VStack spacing={1} flex={1} justifyContent="space-between">
        <Flex
          alignItems="center"
          p={2}
          rounded="xs"
          w="full"
          justifyContent="space-between"
        >
          <Text
            fontSize="14px"
            color="#5D5D5D"
            fontWeight="medium"
            isTruncated
            maxW="60%"
            mr={1}
            ml={1}
          >
            {producto.name}
          </Text>
          <CustomNumberInput
            value={quantity}
            onChange={(value) => {
              setQuantity(value);
            }}
          />
        </Flex>
        <Text
          fontSize="12px"
          noOfLines={2}
          fontWeight={"normal"}
          textAlign="center"
          color={"#6E6E6E"}
          mr={2}
          ml={2}
        >
          {producto.description}
        </Text>
        <Flex justifyContent="space-between" alignItems="center" w="full" p={2}>
          <Text fontSize="sm" fontWeight="bold" textColor={"green"}>
            $ {(producto.default_price.unit_amount / 100).toFixed(2)}{" "}
            {producto.default_price.currency.toUpperCase()}/lb
          </Text>
          <Tooltip label="Agregar al carrito" hasArrow>
            <Button
              colorScheme="main"
              fontSize="xs"
              px={2}
              rounded="md"
              leftIcon={<ShoppingCart size={16} />}
              iconSpacing={0.5}
              onClick={handleAddToCart}
              isDisabled={quantity === 0}
            >
              Agregar
            </Button>
          </Tooltip>
        </Flex>
      </VStack>
    </>
  );
}
