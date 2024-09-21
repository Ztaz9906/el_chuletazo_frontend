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
} from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import ModalProductCard from "@/components/home/Productos/ModalProductCard.jsx";
import { useSelector } from "react-redux";

export default function ModalCart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector((state) => state.cart.products);

  return (
    <>
      <Button
        bg="transparent"
        onClick={onOpen}
        color="white"
        borderBottom="2px solid transparent"
        borderRadius="0"
        _hover={{
          borderBottom: "2px solid",
          borderColor: "main.10",
          color: "white",
        }}
        h="10"
        leftIcon={<Icon as={ShoppingCart} />}
      >
        Mi Carrito
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={3}>
          <ModalHeader>Mi Carrito</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="ghost">Comprar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
