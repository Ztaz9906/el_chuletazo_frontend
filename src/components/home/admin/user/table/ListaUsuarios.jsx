import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useGetUserQuery } from "../../../../../servicios/redux/api/user";
import UsuariosTable from "./UsuariosTable";

export default function ListaUsuarios() {
  const { data, isLoading } = useGetUserQuery();

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
          Usuarios
        </Text>
      </HStack>
      <Divider mb={4} borderColor="gray.300" />

      <UsuariosTable usuarios={data || []} isLoading={isLoading} />
    </VStack>
  );
}
