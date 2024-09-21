import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Image, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeProduct } from "@/servicios/redux/slices/productSliece.js";

const CustomNumberInput = ({ value, onChange, min = 0, max = 99 }) => {
  const handleIncrement = () => onChange(Math.min(value + 1, max));
  const handleDecrement = () => onChange(Math.max(value - 1, min));

  return (
    <Flex alignItems="center" bg="orange.100" rounded="md" shadow="inner" maxW="80px" h="30px">
      <Button onClick={handleDecrement} bg="#b5c4bf" px={1} py={0} h="full" minW="20px" borderRadius={0} roundedLeft="md" _hover={{ bg: "gray.400" }} fontSize="sm" textColor={"#525252"}>-</Button>
      <Input px={1} minW="20px" bg="white" shadow="innerCustom" value={value} onChange={(e) => {
        const newValue = parseInt(e.target.value) || 0;
        onChange(Math.max(min, Math.min(newValue, max)));
      }} textAlign="center" w="30px" h="full" border="none" borderRadius={0} fontSize="sm"/>
      <Button onClick={handleIncrement} bg="#b5c4bf" px={1} h="full" minW="20px" borderRadius={0} roundedRight="md" _hover={{ bg: "gray.400" }} fontSize="sm" textColor={"#525252"}>+</Button>
    </Flex>
  );
};

export default function ModalCart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();

  return (
    <>
      <Button bg="transparent" onClick={onOpen} color="white" borderBottom="2px solid transparent" borderRadius="0" _hover={{ borderBottom: "2px solid", borderColor: "main.10", color: "white" }} h="10" leftIcon={<Icon as={ShoppingCart}/>}>Mi Carrito</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent p={3}>
          <ModalHeader>Mi Carrito</ModalHeader>
          <ModalCloseButton/>
          <ModalBody bg={"gray"}>
            {cart.map(product => (
              <HStack key={product.id} spacing={4} align="start">
                <VStack align="start" spacing={2}>
                  <Image src={product.image} alt={product.name} boxSize="100px" objectFit="cover"/>
                  <Text fontSize="md" fontWeight="bold" textColor={"green"}>
                    $ {(product.default_price.unit_amount / 100).toFixed(2)} {product.default_price.currency.toUpperCase()}/lb
                  </Text>
                </VStack>
                <VStack align="start" spacing={2} flex={1}>
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text fontSize="sm">{product.description}</Text>
                  <HStack spacing={2}>
                    <CustomNumberInput value={product.quantity} onChange={(value) => {
                      dispatch(updateQuantity({ id: product.id, quantity: value }));
                      if (value === 0) {
                        dispatch(removeProduct(product.id));
                      }
                    }} />
                    <Button colorScheme="red" onClick={() => dispatch(removeProduct(product.id))}>Eliminar</Button>
                  </HStack>
                </VStack>
              </HStack>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Cerrar</Button>
            <Button variant="ghost">Comprar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}