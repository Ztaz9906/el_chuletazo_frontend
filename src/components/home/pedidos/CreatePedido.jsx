import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const CreatePedido = () => {
  const cart = useSelector((state) => state.cart.products);

  if (cart.length === 0) {
    return null; 
  }

  const total = cart.reduce((sum, product) => {
    return sum + (product.default_price.unit_amount / 100) * product.quantity;
  }, 0);

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={5} align="center">Confirmar Pedido</Text>
      <Box maxW="800px" mx="auto">
        <TableContainer>
          <Table
            variant="simple"
            bg="rgba(255, 255, 255, 0.6)"
            borderRadius="md"
            boxShadow="xl"
          >
            <Thead>
              <Tr>
                <Th>Producto</Th>
                <Th>Nombre</Th>
                <Th>Descripción</Th>
                <Th isNumeric>Cantidad</Th>
                <Th isNumeric>Precio Unitario</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      boxSize="50px"
                      objectFit="cover"
                    />
                  </Td>
                  <Td>{product.name}</Td>
                  <Td>{product.description}</Td>
                  <Td isNumeric>{product.quantity}</Td>
                  <Td isNumeric>
                    ${(product.default_price.unit_amount / 100).toFixed(2)}
                  </Td>
                  <Td isNumeric>
                    ${((product.default_price.unit_amount / 100) *
                      product.quantity
                    ).toFixed(2)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={4}></Th>
                <Th isNumeric>Total a pagar:</Th>
                <Th isNumeric>${total.toFixed(2)}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <Flex mt={5} justifyContent="flex-end">
          <Button bg="main.10" textColor="white">
            Enviar a Pagar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CreatePedido;