import { useState } from 'react';
import { Box, VStack, HStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Edit2, Trash2 } from "lucide-react";

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [orders] = useState([
    { 
      id: 1, 
      pedido: "ORD-001", 
      fecha: "2024-03-27", 
      destinatario: "Juan Pérez",
      remitente: "María González",
      provincia: "La Habana",
      estado: "En proceso"
    },
    { 
      id: 2, 
      pedido: "ORD-002", 
      fecha: "2024-03-27", 
      destinatario: "Ana Rodríguez",
      remitente: "Carlos López",
      provincia: "Santiago de Cuba",
      estado: "Entregado"
    },
    { 
      id: 3, 
      pedido: "ORD-003", 
      fecha: "2024-03-26", 
      destinatario: "Luis Torres",
      remitente: "Pedro Sánchez",
      provincia: "Matanzas",
      estado: "Pendiente"
    },
    
  ]);

  const filteredOrders = orders.filter(order => 
    order.destinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.remitente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.pedido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (orderId) => {
    console.log('Editar pedido:', orderId);
  };

  const handleDelete = (orderId) => {
    console.log('Eliminar pedido:', orderId);
  };

  return (
    <VStack align="stretch" spacing={4} bg="rgba(255, 255, 255, 0.6)" p={4} boxShadow="lg" mt={4} h="calc(100vh - 100px)">
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="medium" color="main.600">
          Mi Cuenta {'>'} Pedidos
        </Text>
        <Box w="300px">
          <Input
            placeholder="Buscar pedido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
            borderColor="gray.300"
          />
        </Box>
      </HStack>
      
      <Box bg="white" borderRadius="lg" p={4} borderWidth={1} borderColor="gray.200">
        <Text mb={4} color="gray.600">
          {filteredOrders.length} Pedidos Registrados
        </Text>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Pedido</Th>
                <Th>Fecha</Th>
                <Th>Destinatario</Th>
                <Th>Remitente</Th>
                <Th>Provincia</Th>
                <Th>Estado</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOrders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.pedido}</Td>
                  <Td>{order.fecha}</Td>
                  <Td>{order.destinatario}</Td>
                  <Td>{order.remitente}</Td>
                  <Td>{order.provincia}</Td>
                  <Td>{order.estado}</Td>
                  <Td>
                    <HStack justify="center" spacing={4}>
                      <Edit2
                        size={20}
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => handleEdit(order.id)}
                      />
                      <Trash2
                        size={20}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(order.id)}
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
          Eliminar Pedidos
        </Button>
        <Button colorScheme="green" size="md">
          Registrar Pedido
        </Button>
      </HStack>
    </VStack>
  );
};

export default OrderList;