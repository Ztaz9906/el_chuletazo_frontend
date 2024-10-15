import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Menu from './Menu';


const Sidebar = () => {
    return (
        <Box w="300px" bg="whiteAlpha.300" p="6" borderRadius="md" boxShadow="md">
            <Flex direction="column" align="center">
                <Text fontSize="2xl" mb="6">Configuración</Text>
                <Menu />
            </Flex>
        </Box>
    );
};

export default Sidebar;