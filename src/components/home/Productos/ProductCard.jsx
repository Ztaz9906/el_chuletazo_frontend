import { addProduct } from "@/servicios/redux/slices/productSliece.js";
import {
  Box,
  Button,
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductCard = ({ producto }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleAddToCart = async () => {
    const productCard = {
      ...producto,
      quantity: quantity,
    };
    console.log("Product added to cart:", productCard);
    if (quantity === 0) return;
    dispatch(addProduct(productCard));
    setQuantity(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={showAnimation ? { opacity: 1, x: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      <Box
        w="250px"
        h="300px"
        bg="white"
        shadow="md"
        overflow="hidden"
        borderRadius="md"
        display="flex"
        flexDirection="column"
      >
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
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="full"
            p={2}
          >
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
      </Box>
    </motion.div>
  );
};

export default ProductCard;

export const CustomNumberInput = ({ value, onChange, min = 0, max = 99 }) => {
  return (
    <NumberInput
      bg={"white"}
      size="sm"
      maxW="60px"
      value={value}
      borderRadius={"full"}
      onChange={(valueString) => {
        const newValue = parseInt(valueString) || 0;
        onChange(Math.max(min, Math.min(newValue, max)));
      }}
      min={min}
      max={max}
    >
      <NumberInputField textAlign="center" fontSize="xs" />
      <NumberInputStepper>
        <NumberIncrementStepper bg={"white"} _active={{ bg: "gray.300" }} />
        <NumberDecrementStepper bg={"white"} _active={{ bg: "gray.300" }} />
      </NumberInputStepper>
    </NumberInput>
  );
};
