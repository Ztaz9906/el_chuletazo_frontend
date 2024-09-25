import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, IconButton, Stack, Tooltip, Badge } from '@chakra-ui/react';
import { Eye, Pencil, X, DollarSign } from 'lucide-react';

const ListaPedidosUsuarios = () => {

  const pedidos = [
    {
      id: 1,
      date: '25/09/2024',
      time: '14:30',
      recipient: 'Juan Pérez',
      total: 150.75,
      status: 'Pendiente',
      details: [
        { name: 'Producto 1', quantity: 2, price: 50.25 },
        { name: 'Producto 2', quantity: 1, price: 50.25 },
      ],
      createdAt: new Date('2024-09-25T14:30:00'),
    },
    {
      id: 2,
      date: '24/09/2024',
      time: '10:00',
      recipient: 'María García',
      total: 200.00,
      status: 'Pagado',
      details: [
        { name: 'Producto 3', quantity: 4, price: 50.00 },
      ],
      createdAt: new Date('2024-09-24T10:00:00'),
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pendiente':
        return <Badge colorScheme="yellow">{status}</Badge>;
      case 'Pagado':
        return <Badge colorScheme="blue">{status}</Badge>;
      case 'Enviado':
        return <Badge colorScheme="purple">{status}</Badge>;
      case 'Completado':
        return <Badge colorScheme="green">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRemainingTime = (createdAt) => {
    const now = new Date();
    const timeDiff = 24 * 60 * 60 * 1000 - (now - createdAt);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [remainingTimes, setRemainingTimes] = useState(
    pedidos.map((pedido) => getRemainingTime(pedido.createdAt))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimes(pedidos.map((pedido) => getRemainingTime(pedido.createdAt)));
    }, 1000);
    return () => clearInterval(interval);
  }, [pedidos]);

  return (
    <Box p={5}>
      <TableContainer>
        <Table variant="simple" bg="rgba(255, 255, 255, 0.8)" borderRadius="md" boxShadow="xl">
          <Thead>
            <Tr>
              <Th textAlign="center">Fecha de Registro</Th>
              <Th textAlign="center">Hora de Registro</Th>
              <Th textAlign="center">Destinatario</Th>
              <Th textAlign="center" isNumeric>Total Pagado</Th>
              <Th textAlign="center">Estado</Th>
              <Th textAlign="center">Tiempo Restante</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pedidos.map((pedido, index) => (
              <Tr key={pedido.id}>
                <Td textAlign="center">{pedido.date}</Td>
                <Td textAlign="center">{pedido.time}</Td>
                <Td textAlign="center">{pedido.recipient}</Td>
                <Td textAlign="center" isNumeric>${pedido.total.toFixed(2)}</Td>
                <Td textAlign="center">{getStatusBadge(pedido.status)}</Td>
                <Td textAlign="center">{pedido.status === 'Pendiente' ? remainingTimes[index] : '-'}</Td>
                <Td textAlign="center">
                  <Stack direction="row" spacing={2} justify="center">
                    <Tooltip label="Mostrar detalles del pedido" aria-label="Mostrar detalles del pedido">
                      <IconButton
                        icon={<Eye />}
                        size="sm"
                        onClick={() => console.log('Mostrar detalles del pedido', pedido)}
                        colorScheme={'green'}
                      />
                    </Tooltip>
                    <Tooltip label="Editar pedido" aria-label="Editar pedido">
                      <IconButton
                        icon={<Pencil />}
                        size="sm"
                        onClick={() => console.log('Editar pedido', pedido)}
                        isDisabled={pedido.status !== 'Pendiente'}
                        colorScheme={pedido.status !== 'Pendiente' ? 'gray' : 'green'}
                      />
                    </Tooltip>
                    <Tooltip label="Cancelar pedido" aria-label="Cancelar pedido">
                      <IconButton
                        icon={<X />}
                        size="sm"
                        onClick={() => console.log('Cancelar pedido', pedido)}
                        isDisabled={pedido.status !== 'Pendiente'}
                        colorScheme={pedido.status !== 'Pendiente' ? 'gray' : 'green'}
                      />
                    </Tooltip>
                    <Tooltip label="Pagar pedido" aria-label="Pagar pedido">
                      <IconButton
                        icon={<DollarSign />}
                        size="sm"
                        onClick={() => console.log('Pagar pedido', pedido)}
                        isDisabled={pedido.status !== 'Pendiente'}
                        colorScheme={pedido.status !== 'Pendiente' ? 'gray' : 'green'}
                      />
                    </Tooltip>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaPedidosUsuarios;