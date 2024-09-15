import {Box, Button, Flex, Image, Input, Text, VStack} from '@chakra-ui/react';
import {useState} from "react";

const CustomNumberInput = ({ value, onChange, min = 0, max = 99 }) => {
	const handleIncrement = () => onChange(Math.min(value + 1, max));
	const handleDecrement = () => onChange(Math.max(value - 1, min));

	return (
		<Flex alignItems="center" bg="orange.100" rounded="md" shadow="inner">
			<Button
				onClick={handleDecrement}
				bg="gray.300"
				color="gray.700"
				px={2}
				py={1}
				borderRadius={0}
				roundedLeft="md"
				_hover={{ bg: "gray.400" }}
			>
				-
			</Button>
			<Input
				px={4}
				bg={'orange.100'}
				shadow={'innerCustom'}
				value={value}
				onChange={(e) => {
					const newValue = parseInt(e.target.value) || 0;
					onChange(Math.max(min, Math.min(newValue, max)));
				}}
				textAlign="center"
				w="50px"
				border="none"
				borderRadius={0}
			/>
			<Button
				onClick={handleIncrement}
				bg="gray.300"
				color="gray.700"
				px={2}
				py={1}
				borderRadius={0}
				roundedRight="md"
				_hover={{ bg: "gray.400" }}
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
		<Box maxW="sm" mx="auto" bg="gray.400" shadow="md" rounded="lg" overflow="hidden" mt={4}>
			<Box p={2}>
				<Image w="full" h="48" objectFit="cover" src={producto.image} alt={producto.name} />
			</Box>

			<VStack spacing={4} p={2}>
				<Flex bg="main.800" alignItems="center" p={4} rounded="md" w="full">
					<Text fontSize="xl" color="white" fontWeight="bold" mr={4}>{producto.name}</Text>
					<CustomNumberInput
						value={quantity}
						onChange={setQuantity}
					/>
				</Flex>

				<Text mt={4} line>{producto.description}</Text>

				<Flex justifyContent="space-between" alignItems="center" w="full" mt={4}>
					<Text fontSize="lg" fontWeight="bold"> $ {producto.default_price.unit_amount/100} {producto.default_price.currency.toUpperCase()}/lb</Text>
					<Button bg="green.500" color="white" px={4} py={2} rounded="md" _hover={{ bg: "green.600" }}>
						Añadir al carrito
					</Button>
				</Flex>
			</VStack>
		</Box>
	);
};

export default ProductCard;