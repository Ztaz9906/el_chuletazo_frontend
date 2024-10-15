import React from 'react';
import { Box, Flex, Text, IconButton, Collapse, useDisclosure } from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const menuItems = [
    {
        label: 'Cuenta',
        href: '#',
        subItems: [
            { label: 'Cambio de Contraseña', href: '#' },
            { label: 'Datos Personales', href: '#' }
        ]
    },
    { label: 'Destinatarios', href: '/configuracion/destinatarios' }
];

const Menu = () => {
    const { isOpen: isAccountOpen, onToggle: onAccountToggle } = useDisclosure();
    const location = useLocation();

    const isActive = (href) => location.pathname === href;

    return (
        <Box w="250px" p="4" borderRadius="md">
            <Flex direction="column">
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.subItems ? (
                            <>
                                <Flex align="center" justify="space-between" onClick={onAccountToggle} cursor="pointer">
                                    <Text fontSize="lg" color={isActive(item.href) ? 'blue.500' : 'black'}>
                                        <a href={item.href}>{item.label}</a>
                                    </Text>
                                    <IconButton
                                        icon={isAccountOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                        size="sm"
                                        variant="ghost"
                                        aria-label={`Toggle ${item.label} Menu`}
                                    />
                                </Flex>
                                <Collapse in={isAccountOpen} animateOpacity>
                                    <Box pl="4" mt="2">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <Text fontSize="md" mb="2" key={subIndex} color={isActive(subItem.href) ? 'blue.500' : 'black'}>
                                                <a href={subItem.href}>{subItem.label}</a>
                                            </Text>
                                        ))}
                                    </Box>
                                </Collapse>
                            </>
                        ) : (
                            <Text fontSize="lg" mt="4" color={isActive(item.href) ? 'blue.500' : 'black'}>
                                <a href={item.href}>{item.label}</a>
                            </Text>
                        )}
                    </React.Fragment>
                ))}
            </Flex>
        </Box>
    );
};

export default Menu;