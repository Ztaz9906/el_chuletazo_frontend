import { Button, HStack, Image, Text, VStack, Spacer, Box, Tooltip } from "@chakra-ui/react";
import { CustomNumberInput } from "@/components/home/Productos/ProductCard.jsx";
import { deleteProduct, editQuantity } from "@/servicios/redux/slices/productSliece.js";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";

export default function ModalProductCard({ product }) {
  const dispatch = useDispatch();

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
              value={product.quantity}
              onChange={(value) => {
                dispatch(editQuantity({ id: product.id, quantity: value }));
                if (value === 0) {
                  dispatch(deleteProduct(product.id));
                }
              }}
            />
            <Tooltip label="Eliminar Producto" hasArrow>
              <Trash2
                onClick={() => dispatch(deleteProduct(product.id))}
                cursor={"pointer"}
                color="red"
              />
            </Tooltip>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}