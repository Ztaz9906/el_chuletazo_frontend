import React from 'react';
import { Box, Flex, Text, Divider, Icon } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { label: 'Datos Personales', href: '/datos-personales' },
        { label: 'Cambio de Contraseña', href: '/cambio-contrasena' },
        { label: 'Mis Destinatarios', href: '/configuracion/destinatarios' }
    ];

    return (
        <Box w="300px" bg="white" p="6" borderRadius="md" boxShadow="md">
            <Flex direction="column" align="flex-start">
                <Text fontSize="2xl" mb="6" alignSelf="center">Configuración</Text>
                <Flex direction="column" align="flex-start" w="100%">
                    <Icon as={FaUser} boxSize={10} mb="4" alignSelf="center" />
                    <Text fontSize="xl" mb="4" alignSelf="center">Mi Cuenta</Text>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link to={item.href}>
                                <Text fontSize="lg" mb="2">{item.label}</Text>
                            </Link>
                            {index < menuItems.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Sidebar;