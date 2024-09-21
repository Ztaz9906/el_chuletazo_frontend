import { Button, HStack, Image, Text, VStack, Spacer, Box, Tooltip, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { CustomNumberInput } from "@/components/home/Productos/ProductCard.jsx";
import { deleteProduct, editQuantity } from "@/servicios/redux/slices/productSliece.js";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export default function ModalProductCard({ product }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [tempQuantity, setTempQuantity] = useState(product.quantity);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleQuantityChange = (value) => {
    if (value === 0) {
      setIsDeleting(true);
      onOpen();
    } else {
      setTempQuantity(value);
      dispatch(editQuantity({ id: product.id, quantity: value }));
    }
  };

  const handleRemoveProduct = () => {
    dispatch(deleteProduct(product.id));
    onClose();
  };

  const handleKeepProduct = () => {
    if (isDeleting) {
      setTempQuantity(1);
      dispatch(editQuantity({ id: product.id, quantity: 1 }));
    } else {
      setTempQuantity(product.quantity);
    }
    onClose();
  };

  const handleDeleteClick = () => {
    setIsDeleting(false);
    onOpen();
  };

  return (
    <Box position="relative" w="full">
      <HStack
        spacing={4}
        align="stretch"
        shadow={"md"}
        w={"100%"}
        borderRadius={"5px"}
        p={1}
        bg={"white"}
      >
        <VStack align="start" spacing={2} flex={1}>
          <Image
            src={product.image}
            alt={product.name}
            boxSize="100px"
            objectFit="cover"
          />
          <Text fontSize="md" fontWeight="bold" textColor={"green"}>
            ${(product.default_price.unit_amount / 100).toFixed(2)}{" "}
            {product.default_price.currency.toUpperCase()}/lb
          </Text>
        </VStack>
        
        <VStack align="start" spacing={4} flex={2}>
          <Text fontWeight="bold">{product.name}</Text>
          <Text fontSize="sm">{product.description}</Text>
          <Spacer />
          <HStack spacing={2} alignSelf="flex-end">
            <CustomNumberInput
              value={tempQuantity}
              onChange={handleQuantityChange}
            />
            <Tooltip label="Eliminar Producto" hasArrow>
              <Trash2
                onClick={handleDeleteClick}
                cursor={"pointer"}
                color="red"
              />
            </Tooltip>
          </HStack>
        </VStack>
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Producto
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que deseas quitar este producto del carrito?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleKeepProduct}>
                Mantener
              </Button>
              <Button colorScheme="red" onClick={handleRemoveProduct} ml={3}>
                Quitar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}