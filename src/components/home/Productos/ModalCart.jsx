import ModalProductCard from "@/components/home/Productos/ModalProductCard.jsx";
import { clearCart } from "@/servicios/redux/slices/productSliece.js";
import {
  Badge,
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fondo from "/fondo_2.png";

export default function ModalCart({ textColor = "white" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector((state) => state.cart.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const total = cart.reduce((sum, product) => {
    return sum + (product.default_price.unit_amount / 100) * product.quantity;
  }, 0);

  const handleComprarClick = () => {
    if (cart.length > 0) {
      navigate("/pedidos/confirmar_pedido");
      onClose();
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
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
        fontSize={["14px", "16px", "18px"]} // Responsivo
      >
        Mi Carrito
        {cart.length > 0 && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            position="absolute"
            top="-1"
            left="-1"
            fontSize={["0.6em", "0.8em"]} // Responsivo
          >
            {cart.length}
          </Badge>
        )}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          p={3}
          bgImage={`url(${fondo})`}
          bgSize="cover"
          bgPosition="center"
          mx={2}
          maxH="80vh"
          maxW="600px"
        >
          <ModalHeader>
            <HStack w="full" justify={"space-between"}>
              <Text
                fontWeight="bold"
                fontSize={["14px", "16px", "18px"]} // Responsivo
                color={"#494949"}
              >{`Mi Carrito > Productos`}</Text>
              {cart.length > 0 && (
                <Button
                  textColor={"white"}
                  colorScheme="cart"
                  onClick={handleClearCart}
                  mr={3}
                  w={"120px"}
                  h={"35px"}
                  fontSize={["12px", "14px", "16px"]} // Responsivo
                >
                  Vaciar Carrito
                </Button>
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={2} overflowY="auto">
            <VStack spacing={2}>
              {cart.length === 0 ? (
                <Text fontSize={["14px", "16px"]}>
                  No tienes productos en tu carrito
                </Text>
              ) : (
                cart.map((product) => (
                  <ModalProductCard key={product.id} product={product} />
                ))
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack w="full">
              <Text
                fontWeight="bold"
                color={"#494949"}
                fontSize={["14px", "16px"]}
              >
                Total:
              </Text>
              <Text
                fontWeight="bold"
                color={"#494949"}
                fontSize={["14px", "16px"]}
              >
                ${total.toFixed(2)}
              </Text>
              <Spacer />
              <Button
                textColor={"white"}
                colorScheme="cart"
                mr={3}
                onClick={onClose}
                fontSize={["12px", "14px", "16px"]} // Responsivo
              >
                Cerrar
              </Button>
              <Button
                colorScheme="main"
                textColor={"white"}
                onClick={handleComprarClick}
                fontSize={["12px", "14px", "16px"]} // Responsivo
              >
                Comprar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
