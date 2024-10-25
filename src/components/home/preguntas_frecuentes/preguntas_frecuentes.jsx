// src/components/InfoPagos.jsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';


const InfoPreguntasFrecuentes = () => {
  return (
    <Box
        height="100%"
        display="flex"
        flexDirection="column"
        bg="white"
        shadow="md"
        p={4}
        mr={2}
        ml={2}>  
        <Text
            fontSize="4xl"
            fontWeight="bold"
            color="green.500"
            mb={4}
        >Preguntas Frecuentes</Text>
        
    </Box>
  );
};

export default InfoPreguntasFrecuentes;