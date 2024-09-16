import {Box, Button, Flex, Image, Input, Text, Tooltip, VStack} from '@chakra-ui/react';
import {useState} from "react";
import {ShoppingCart} from "lucide-react";

const CustomNumberInput = ({ value, onChange, min = 0, max = 99 }) => {
	const handleIncrement = () => onChange(Math.min(value + 1, max));
	const handleDecrement = () => onChange(Math.max(value - 1, min));

	return (
		<Flex alignItems="center" bg="orange.100" rounded="md" shadow="inner" maxW="80px" h="30px">
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
	console.log(producto)
	return (
		<Box maxW="xs" mx="auto" bg="gray.400" shadow="md" overflow="hidden" mt={4}>
			
			<Box p={2} maxW="220px" minW="200px" h="150px" >
				<Image objectFit="cover" src={producto.image} alt={producto.name} />
			</Box>

			<VStack spacing={2} p={0}>
				<Flex bg="main.800" alignItems="center" p={2} rounded="xs" w="full">
					<Text fontSize="xs" color="white" fontWeight="bold" mr={14}>{producto.name}</Text>
					<CustomNumberInput
						value={quantity}
						onChange={setQuantity}
					/>
				</Flex>

				<Text mt={2} line fontSize="sm">{producto.description}</Text>

				<Flex justifyContent="space-between" alignItems="center" w="full" mt={2}>
					<Text fontSize="md" fontWeight="bold"> $ {producto.default_price.unit_amount/100} {producto.default_price.currency.toUpperCase()}/lb</Text>
					<Box bg="green.500" color="white" px={2} py={1} rounded="md" _hover={{ bg: "green.600" }}>
						<Tooltip label={'Agregar al carrito'} hasArrow >
							<ShoppingCart />
						</Tooltip>
					</Box>
				</Flex>
			</VStack>
		</Box>
	);
};

export default ProductCard;