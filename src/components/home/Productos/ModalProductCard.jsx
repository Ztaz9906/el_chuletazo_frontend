import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { CustomNumberInput } from "@/components/home/Productos/ProductCard.jsx";
import {
  deleteProduct,
  editQuantity,
} from "@/servicios/redux/slices/productSliece.js";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";

export default function ModalProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <HStack
      spacing={4}
      align="start"
      shadow={"md"}
      border
      borderWidth={"1px"}
      borderColor={"gray.300"}
      w={"100%"}
      borderRadius={"5px"}
      p={1}
    >
      <VStack align="start" spacing={2}>
        <Image
          src={product.image}
          alt={product.name}
          boxSize="100px"
          objectFit="cover"
        />
        <Text fontSize="md" fontWeight="bold" textColor={"green"}>
          $ {(product.default_price.unit_amount / 100).toFixed(2)}{" "}
          {product.default_price.currency.toUpperCase()}/lb
        </Text>
      </VStack>
      <VStack align="start" spacing={2} flex={1}>
        <Text fontWeight="bold">{product.name}</Text>
        <Text fontSize="sm">{product.description}</Text>
        <HStack spacing={2}>
          <CustomNumberInput
            value={product.quantity}
            onChange={(value) => {
              dispatch(editQuantity({ id: product.id, quantity: value }));
              if (value === 0) {
                dispatch(deleteProduct(product.id));
              }
            }}
          />
          <Trash2
            onClick={() => dispatch(deleteProduct(product.id))}
            cursor={"pointer"}
          />
          <Button
            colorScheme="red"
            onClick={() => dispatch(deleteProduct(product.id))}
          >
            Eliminar
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}
