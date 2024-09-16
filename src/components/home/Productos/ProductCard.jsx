import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const CustomNumberInput = ({ value, onChange, min = 0, max = 99 }) => {
  const handleIncrement = () => onChange(Math.min(value + 1, max));
  const handleDecrement = () => onChange(Math.max(value - 1, min));

  return (
    <Flex
      alignItems="center"
      bg="orange.100"
      rounded="md"
      shadow="inner"
      maxW="80px"
      h="30px"
    >
      <Button
        onClick={handleDecrement}
        bg="gray.300"
        px={1}
        py={0}
        h="full"
        minW="20px"
        borderRadius={0}
        roundedLeft="md"
        _hover={{ bg: "gray.400" }}
        fontSize="sm"
      >
        -
      </Button>

      <Input
        px={1}
        minW="20px"
        bg="orange.100"
        shadow="innerCustom"
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || 0;
          onChange(Math.max(min, Math.min(newValue, max)));
        }}
        textAlign="center"
        w="30px"
        h="full"
        border="none"
        borderRadius={0}
        fontSize="sm"
      />

      <Button
        onClick={handleIncrement}
        bg="gray.300"
        px={1}
        h="full"
        minW="20px"
        borderRadius={0}
        roundedRight="md"
        _hover={{ bg: "gray.400" }}
        fontSize="sm"
      >
        +
      </Button>
    </Flex>
  );
};

const ProductCard = ({ producto }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <Box
      w="300px"
      h="400px"
      bg="gray.400"
      shadow="md"
      overflow="hidden"
      borderRadius="md"
      display="flex"
      flexDirection="column"
    >
      <Box p={3} h="200px">
        <Image
          objectFit="contain"
          w="100%"
          h="100%"
          src={producto.image}
          alt={producto.name}
        />
      </Box>

      <VStack spacing={3} p={3} flex={1} justifyContent="space-between">
        <Flex
          bg="main.800"
          alignItems="center"
          p={2}
          rounded="md"
          w="full"
          justifyContent="space-between"
        >
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            isTruncated
            maxW="60%"
          >
            {producto.name}
          </Text>
          <CustomNumberInput value={quantity} onChange={setQuantity} />
        </Flex>

        <Text fontSize="sm" noOfLines={2} textAlign="center">
          {producto.description}
        </Text>

        <Flex justifyContent="space-between" alignItems="center" w="full">
          <Text fontSize="md" fontWeight="bold">
            $ {(producto.default_price.unit_amount / 100).toFixed(2)}{" "}
            {producto.default_price.currency.toUpperCase()}/lb
          </Text>
          <Tooltip label="Agregar al carrito" hasArrow>
            <Button
              bg="green.500"
              color="white"
              px={3}
              py={2}
              rounded="md"
              _hover={{ bg: "green.600" }}
              leftIcon={<ShoppingCart size={18} />}
            >
              Agregar
            </Button>
          </Tooltip>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ProductCard;
