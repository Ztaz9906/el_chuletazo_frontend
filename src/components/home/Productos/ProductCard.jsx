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
        bg="main.10"
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
        bg="main.10"
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
    <Box  /*Contenedor general de los productos*/
      w="250px"
      h="350px"
      bg="white"
      shadow="md"
      overflow="hidden"
      borderRadius="md"
      display="flex"
      flexDirection="column"
    >
      <Box p={3} h="200px"/*Contenedor de la imagen del producto*/> 
        <Image
          objectFit="contain"
          w="100%"
          h="100%"
          src={producto.image}
          alt={producto.name}   /**Nombre del producto */
        />
      </Box>

      <VStack spacing={2} flex={1} justifyContent="space-between">
        <Flex
          bg="#bce6d7"
          alignItems="center"
          p={2}
          rounded="xs"
          w="full"
          justifyContent="space-between"
        >
          <Text
            fontSize="sm"
            color="black"
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

        <Flex justifyContent="space-between" alignItems="center" w="full"  p={2}>
          
          <Text fontSize="md" fontWeight="bold" textColor={"green"}>
            $ {(producto.default_price.unit_amount / 100).toFixed(2)}{" "}
            {producto.default_price.currency.toUpperCase()}/lb
          </Text>

          <Tooltip label="Agregar al carrito" hasArrow>

            <Button
              bg="main.10"
              color="white"
              px={1}
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
