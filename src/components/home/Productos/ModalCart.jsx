import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import ModalProductCard from "@/components/home/Productos/ModalProductCard.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fondo from "@/assets/fondo_2.png"; 

export default function ModalCart({ textColor = "white" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector((state) => state.cart.products);
  const navigate = useNavigate();

  const total = cart.reduce((sum, product) => {
    return sum + (product.default_price.unit_amount / 100) * product.quantity;
  }, 0);

  const handleComprarClick = () => {
    if (cart.length > 0) {
      navigate("/pedidos");
      onClose();
    }
  };

  return (
    <>
      <Button
        bg="transparent"
        onClick={onOpen}
        color={textColor}
        borderBottom="2px solid transparent"
        borderRadius="0"
        _hover={{
          borderBottom: "2px solid",
          borderColor: "main.10",
          color: textColor,
        }}
        h="10"
        leftIcon={<Icon as={ShoppingCart} />}
        position="relative"
      >
        Mi Carrito
        {cart.length > 0 && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            position="absolute"
            top="-1"
            left="-1"
            fontSize="0.8em"
          >
            {cart.length}
          </Badge>
        )}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          p={3}
          bgImage={`url(${fondo})`}
          bgSize="cover"
          bgPosition="center"
          maxH="80vh" 
          maxW="600px" 
        >
          <ModalHeader>Mi Carrito</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={2} overflowY="auto">
            <VStack spacing={2}>
              {cart.length === 0 ? (
                <Text>No tienes productos en tu carrito</Text>
              ) : (
                cart.map((product) => (
                  <ModalProductCard key={product.id} product={product} />
                ))
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack w="full">
              <Text fontWeight="bold">Total:</Text>
              <Text>${total.toFixed(2)}</Text>
              <Spacer />
              <Button textColor={"white"} bg="main.10" mr={3} onClick={onClose}>Cerrar</Button>
              <Button bg="main.10" textColor={"white"} onClick={handleComprarClick}>Comprar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}