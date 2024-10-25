import React from 'react';
import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Image } from '@chakra-ui/react';

const InfoPagos = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column" bg="white" shadow="md" p={4} mr={2} ml={2}>
      
      <Text fontSize="4xl" fontWeight="bold" color="green.500" mb={4}>Pagos</Text>
      
      <Accordion defaultIndex={[0]} allowMultiple>
        
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                Método de Pago
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex justify="space-between" align="center">
              <Text mr={20}>
                En nuestro sitio web "El Chuletazo", usted podrá realizar el pago de diversas formas seguras y confiables, a través de la plataforma Stripe. Los métodos de pagos que se ofrecen son los siguientes:
                <br />1. Visa
                <br />2. MasterCard
                <br />3. American Express
              </Text>
              <Box>
                <Image src="src/assets/gif/metod_pay.gif" alt="Método de Pago" width={200} />
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                Pasos a Seguir
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex justify="space-between" align="center">
              <Text mr={20}>
                1. <strong>Seleccione sus productos:</strong><br />
                Navegue por nuestra tienda y agregue al carrito los productos que desee comprar.
                <br />2. <strong>Revise su carrito:</strong><br />
                Una vez que haya seleccionado todos los productos, diríjase a su carrito para revisar el pedido. Haga clic en el botón de "Comprar" para comenzar el proceso de pago.
                <br />3. <strong>Inicie el proceso de pago:</strong><br />
                Complete la información requerida en cada uno de los pasos, lo que incluye registrar y seleccionar a su Destinatario (persona a la que se le enviarán los productos), introducir los datos del Remitente (persona que está haciendo el pedido) y si todo está correcto, presione en el botón "Confirmar Pedido" para dirigirse a la pasarela de pagos Stripe.
                <br />4. <strong>Pagar:</strong><br />
                Seleccione su método de pago y complete los campos referentes a sus tarjetas personales.
              </Text>
              <Box>
                <Image src="src/assets/gif/step_pay.gif" alt="Método de Pago" width={300} />
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                Seguridad en el Pago
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex justify="space-between" align="center">
              <Text mr={20}>
                En <strong>El Chuletazo</strong>, la seguridad de los datos de cada uno de nuestros clientes es nuestra prioridad. La pasarela de pagos Stripe utiliza tecnología de encriptación avanzada para proteger su información financiera. En caso de que presente alguna dificultad a la hora de realizar su pago, por favor comuníquese con nosotros de inmediato.
              </Text>
              <Box>
                <Image src="src/assets/gif/security_pay.gif" alt="Seguridad en el Pago" width={300} />
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                Confirmación de Pago
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex justify="space-between" align="center">
              <Text mr={20}>
                Una vez que se haya realizado el pago, el cliente recibirá un mensaje de confirmación a la dirección de correo electrónico proporcionada a nuestro sitio. Este correo incluirá todos los detalles de la transacción y el recibo de la compra que acaba de realizar.
              </Text>
              <Box>
                <Image src="src/assets/gif/confirm_pay.gif" alt="Confirmación de Pago" width={250}/>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize="xl" fontWeight="bold">
                Medidas Contra Pago Fraudulento
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex justify="space-between" align="center">
              <Text mr={20}>
                En caso de que se detecte un pago sospechoso que no pueda ser aclarado entre la entidad bancaria, la financiera y <strong>El Chuletazo</strong>, y la orden correspondiente haya sido entregada sin que <strong>El Chuletazo</strong> haya logrado cobrar el pago, se tomarán medidas estrictas. Tanto el cliente involucrado, como la tarjeta utilizada en la transacción y sus destinatarios, serán vetados y no podrán realizar compras futuras en nuestra tienda.
              </Text>
              <Box>
                <Image src="src/assets/gif/fraude_pay.gif" alt="Medidas Contra Pago Fraudulento" width={500}/>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        
      </Accordion>
      
    </Box>
  );
};

export default InfoPagos;