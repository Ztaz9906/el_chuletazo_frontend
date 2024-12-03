import { useState } from 'react';
import { Box, VStack, HStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Edit2, Trash2 } from "lucide-react";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users] = useState([
    { id: 1, nombre: "Pepa", apellidos: "Pig", rol: "Administrador" },
    { id: 2, nombre: "Thalia de la Caridad", apellidos: "Puente Rodríguez", rol: "Usuario" },
    { id: 3, nombre: "Esmerejilda de las Mercedes", apellidos: "González Castellanos", rol: "Usuario" },
  ]);

  const filteredUsers = users.filter(user => 
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId) => {
    console.log('Editar usuario:', userId);
  };

  const handleDelete = (userId) => {
    console.log('Eliminar usuario:', userId);
  };

  return (
    <VStack align="stretch" spacing={4} bg="rgba(255, 255, 255, 0.6)" p={4} boxShadow="lg" mt={4} h="calc(100vh - 100px)">
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="medium" color="main.600">
          Mi Cuenta {'>'} Usuarios Registrados
        </Text>
        <Box w="300px">
          <Input
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
            borderColor="gray.300"
          />
        </Box>
      </HStack>
      
      <Box bg="white" borderRadius="lg" p={4} borderWidth={1} borderColor="gray.200">
        <Text mb={4} color="gray.600">
          {filteredUsers.length} Usuarios Registrados
        </Text>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Apellidos</Th>
                <Th>Rol</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.nombre}</Td>
                  <Td>{user.apellidos}</Td>
                  <Td>{user.rol}</Td>
                  <Td>
                    <HStack justify="center" spacing={4}>
                      <Edit2
                        size={20}
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => handleEdit(user.id)}
                      />
                      <Trash2
                        size={20}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(user.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <HStack justify="flex-end" spacing={4}>
        <Button colorScheme="red" size="md">
          Eliminar Usuarios
        </Button>
        <Button colorScheme="green" size="md">
          Registrar Usuario
        </Button>
      </HStack>
    </VStack>
  );
};

export default UserList;