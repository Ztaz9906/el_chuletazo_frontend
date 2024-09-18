import { useState } from 'react';
import { Box, Button, HStack, Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

function NavBar() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <Box bg="rgba(0, 0, 0, 0.2)" w="full">
      <HStack spacing={6} justify="space-between" align="flex-end">
        <HStack spacing={6}>
          {['Productos más vendidos', 'Todos los productos', 'Carne de Cerdo', 'Cerdo Ahumado', 'Embutidos'].map((label, index) => (
            <Button
              key={index}
              bg={activeButton === index ? 'linear-gradient(to top, green 50%, transparent 100%)' : 'transparent'}
              color="white"
              borderBottom="2px solid transparent"
              borderRadius="0"
              _hover={{ borderBottom: '2px solid', borderColor: 'main.10', color: 'white' }}
              h="10"
              onClick={() => handleButtonClick(index)}
            >
              {label}
            </Button>
          ))}
        </HStack>
        <Button
          bg="transparent"
          color="white"
          borderBottom="2px solid transparent"
          borderRadius="0"
          _hover={{ borderBottom: '2px solid', borderColor: 'main.10', color: 'white' }}
          h="10"
          leftIcon={<Icon as={FaShoppingCart} />}
        >
          Mis Compras
        </Button>
      </HStack>
    </Box>
  );
}

export default NavBar;