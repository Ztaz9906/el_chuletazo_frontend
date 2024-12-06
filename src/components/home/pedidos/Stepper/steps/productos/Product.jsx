import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Product({ product }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <Flex
      w="full"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
      bg="white"
      flexDirection="column"
    >
      <Flex h="100px">
        <Box w="80px" h="full" mr={2} flexShrink={0}>
          <Image
            objectFit="cover"
            w="100%"
            h="100%"
            src={product.image}
            alt={product.name}
          />
        </Box>
        <Flex flexDirection={"column"} justify={"space-between"} p={1}>
          <Box flex={1} overflow="hidden">
            <Text fontWeight="bold" fontSize="xs" noOfLines={1}>
              {product.name}
            </Text>

            <Text
              fontSize="2xs"
              color="gray.500"
              noOfLines={showFullDescription ? undefined : 2}
            >
              {product.description}
            </Text>

            <Text fontSize="2xs" color="gray.600" noOfLines={1}>
              {product.quantity} x $
              {(product.default_price.unit_amount / 100).toFixed(2)}{" "}
              {product.default_price.currency.toUpperCase()}/unidad
            </Text>
          </Box>
          <Flex textAlign="right" justify={"flex-end"}>
            <Text fontWeight="bold" fontSize="xs" noOfLines={1}>
              $
              {(
                (product.quantity * product.default_price.unit_amount) /
                100
              ).toFixed(2)}{" "}
              {product.default_price.currency.toUpperCase()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
