import { useGetPedidosQuery } from "@/servicios/redux/api/Pedidos/index.js";
import { Box, Divider, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { CircleChevronLeft } from "lucide-react";
import AdminPedidosTable from "./AdminPedidosTable";

export default function AdminListaPedidos() {
  const { data, isLoading, isError, error } = useGetPedidosQuery();

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <VStack
      h="calc(100vh - 100px)"
      bg="rgba(255, 255, 255, 0.6)"
      p={3}
      boxShadow="lg"
      mt={4}
      borderRadius={"5px"}
    >
      <HStack w="full" justify="space-between" mt={2}>
        <Text fontSize="2xl" fontWeight="medium" color="main.600">
          Lista de Pedidos
        </Text>
        <HStack
          spacing={2}
          justify={"space-between"}
          as={Link}
          href="/productos"
          transition="transform 0.2s"
          _hover={{
            textDecoration: "none",
            transform: "translateX(-5px)",
            fontWeight: "bold",
          }}
        >
          <Box as={CircleChevronLeft} size={20} color="main.600" />
          <Text color="main.600" mr={"4px"}>
            Atrás
          </Text>
        </HStack>
      </HStack>
      <Divider mb={4} borderColor="gray.300" />

      <AdminPedidosTable pedidos={data || []} isLoading={isLoading} />
    </VStack>
  );
}
