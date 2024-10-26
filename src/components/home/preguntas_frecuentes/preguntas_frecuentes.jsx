import React from 'react';
import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Image, UnorderedList, ListItem } from '@chakra-ui/react';

const InfoPreguntasFrecuentes = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column" bg="white" shadow="md" p={4} mr={2} ml={2}>

      <Text fontSize="4xl" fontWeight="bold" color="green.500" mb={4}>Preguntas Frecuentes</Text>
      
      <Accordion allowToggle>
        
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                ¿Es posible pagar con tarjetas MLC?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex align="center">
              <Box flex="2" pr={4}>
                <Text fontSize="md" color="gray.700" mb={2}>
                    No, no es posible realizar su pago usando tarjetas MLC, debido a que estas no son válidas en nuestra tienda virtual.
                </Text>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                ¿Es posible realizar la compra desde cualquier país del mundo?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
                <Text fontSize="md" color="gray.700" mb={2}>
                    Si, usted puede realizar su compra desde cualquier país del mundo.
                </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                ¿Es posible realizar el pago en efectivo en Cuba, una vez recibido el producto?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
                <Text fontSize="md" color="gray.700" mb={2}>
                    No, la entrega de los productos se realiza una vez que el pedido haya sido pagado en nuestra tienda online.
                </Text>
          </AccordionPanel>
        </AccordionItem>
        
      </Accordion>
      
    </Box>
  );
};

export default InfoPreguntasFrecuentes;