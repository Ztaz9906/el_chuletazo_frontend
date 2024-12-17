import { Box, Button, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import CustomNumberInput from "../CustomNumberInput";

export function renderMobileProductCard(
  producto,
  setQuantity,
  quantity,
  handleAddToCart
) {
  return (
    <>
      <Flex p={3} alignItems="center" gap={3}>
        {/* Image Container */}
        <Box w="100px" h="100px" flex="0 0 auto">
          <Image
            objectFit="cover"
            w="full"
            h="full"
            src={producto.image}
            alt={producto.name}
            borderRadius="md"
          />
        </Box>

        {/* Text Container */}
        <Flex flexDirection="column" flex="1">
          <Text
            fontSize="14px"
            color="#5D5D5D"
            fontWeight="medium"
            textAlign="left"
            mb={1}
          >
            {producto.name}
          </Text>

          <Text
            fontSize="12px"
            fontWeight="normal"
            textAlign="left"
            color="#6E6E6E"
            noOfLines={3}
          >
            {producto.description}
          </Text>
        </Flex>
      </Flex>

      {/* Price and Cart Actions */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={3}
        borderTop="1px solid"
        borderColor="gray.100"
      >
        <Text fontSize="sm" fontWeight="bold" textColor="green">
          $ {(producto.default_price.unit_amount / 100).toFixed(2)}{" "}
          {producto.default_price.currency.toUpperCase()}/lb
        </Text>

        <CustomNumberInput
          value={quantity}
          onChange={(value) => {
            setQuantity(value);
          }}
        />

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
    </>
  );
}
