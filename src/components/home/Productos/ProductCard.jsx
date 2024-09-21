import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Tooltip,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { addProduct } from "@/servicios/redux/slices/productSliece.js";
import { useDispatch } from "react-redux";

const ProductCard = ({ producto }) => {
  const [quantity, setQuantity] = useState(0);
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
    setQuantity(0);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={showAnimation ? { opacity: 1, x: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      <Box
        w="250px"
        h="350px"
        bg="white"
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

        <VStack spacing={2} flex={1} justifyContent="space-between">
          <Flex
            bg="main.5"
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
            <CustomNumberInput
              value={quantity}
              onChange={(value) => {
                setQuantity(value);
              }}
            />
          </Flex>
          <Text fontSize="sm" noOfLines={2} textAlign="center">
            {producto.description}
          </Text>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="full"
            p={2}
          >
            <Text fontSize="md" fontWeight="bold" textColor={"green"}>
              $ {(producto.default_price.unit_amount / 100).toFixed(2)}{" "}
              {producto.default_price.currency.toUpperCase()}/lb
            </Text>
            <Tooltip label="Agregar al carrito" hasArrow>
              <Button
                bg="white"
                color="main.10"
                px={1}
                py={2}
                rounded="md"
                _hover={{ bg: "main.10", color: "white" }}
                leftIcon={<ShoppingCart size={18} />}
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
      maxW="80px"
      value={value}
      onChange={(valueString) => {
        const newValue = parseInt(valueString) || 0;
        onChange(Math.max(min, Math.min(newValue, max)));
      }}
      min={min}
      max={max}
    >
      <NumberInputField
        textAlign="center"
        fontSize="sm"
      />
      <NumberInputStepper>
        <NumberIncrementStepper 
          bg={"white"}
          _active={{ bg: "gray.300"}}/>
        <NumberDecrementStepper 
          bg={"white"}
          _active={{ bg: "gray.300"}}/>
      </NumberInputStepper>
    </NumberInput>
  );
};