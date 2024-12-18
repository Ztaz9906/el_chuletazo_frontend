import {
  deleteProduct,
  editQuantity,
} from "@/servicios/redux/slices/productSliece.js";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CustomNumberInput from "./CustomNumberInput";

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
        p={3}
        bg={"white"}
      >
        <VStack align="start" spacing={2} flex={1}>
          <Image
            src={product.image}
            alt={product.name}
            boxSize="full"
            objectFit="cover"
          />
          <Text
            fontSize={["14px", "16px"]}
            fontWeight="bold"
            textColor={"green"}
          >
            ${(product.default_price.unit_amount / 100).toFixed(2)}{" "}
            {product.default_price.currency.toUpperCase()}/lb
          </Text>
        </VStack>

        <VStack align="start" spacing={4} flex={2}>
          <Text
            fontSize={["14px", "16px", "18px"]}
            color="#5D5D5D"
            fontWeight="medium"
            isTruncated
            maxW="60%"
          >
            {product.name}
          </Text>
          <Divider color={"#7A7A7A"} borderWidth={"1px"} />
          <Text
            fontSize={["12px", "14px", "16px"]}
            noOfLines={2}
            fontWeight={"normal"}
            textAlign="center"
            color={"#6E6E6E"}
          >
            {product.description}
          </Text>
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
                color="#E35305"
              />
            </Tooltip>
          </HStack>
        </VStack>
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={2}>
            <AlertDialogHeader
              fontSize={["16px", "18px", "20px"]}
              fontWeight="bold"
            >
              Eliminar Producto del Carrito
            </AlertDialogHeader>

            <AlertDialogBody fontSize={["14px", "16px"]}>
              ¿Está seguro de que desea eliminar este producto del carrito?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleKeepProduct}
                fontSize={["12px", "14px"]}
              >
                Mantener
              </Button>
              <Button
                colorScheme="red"
                onClick={handleRemoveProduct}
                ml={3}
                fontSize={["12px", "14px"]}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
