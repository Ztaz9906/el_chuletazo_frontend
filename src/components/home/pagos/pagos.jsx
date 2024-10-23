// src/components/InfoPagos.jsx
import React from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Heading, Text } from '@chakra-ui/react';

const InfoPagos = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Pagos</Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'main.500', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left">
                Métodos de Pago
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              Aceptamos pagos a través de <strong>Stripe</strong>, una plataforma segura y confiable que permite el uso de las siguientes tarjetas de crédito y débito:
              <ul>
                <li>Visa</li>
                <li>MasterCard</li>
                <li>American Express</li>
                <li>Discover</li>
              </ul>
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'main.500', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left">
                Proceso de Pago
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              1. <strong>Selecciona tus productos</strong>: Navega por nuestra tienda y añade los productos que deseas comprar a tu carrito.<br />
              2. <strong>Revisa tu carrito</strong>: Una vez que hayas seleccionado todos los productos, dirígete a tu carrito para revisar tu pedido.<br />
              3. <strong>Inicia el proceso de pago</strong>: Haz clic en el botón de "Pagar" para comenzar el proceso de pago.<br />
              4. <strong>Introduce tus datos</strong>: Completa la información requerida, incluyendo tu dirección de envío y los detalles de tu tarjeta de crédito o débito.<br />
              5. <strong>Confirma tu pedido</strong>: Revisa todos los detalles de tu pedido y confirma la compra. Recibirás un correo electrónico de confirmación con los detalles de tu pedido.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'main.500', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left">
                Seguridad en los Pagos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              En <strong>El Chuletazo</strong>, la seguridad de tus datos es nuestra prioridad. Stripe utiliza tecnología de encriptación avanzada para proteger tu información financiera. Además, cumplimos con los estándares de seguridad PCI-DSS para garantizar que tus datos estén siempre seguros.
            </Text>
            <Text>
              En conformidad con nuestro compromiso respecto a la seguridad de los pagos, informamos a nuestros clientes que las pasarelas de pago que utilizamos en <strong>El Chuletazo</strong> cuentan con la verificación de las entidades financieras asociadas y verifican la fiabilidad de los datos facilitados durante la realización de un pedido. Este proceso forma parte de nuestra lucha contra el fraude en los modos de pago por Internet y para proteger al conjunto de los consumidores.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'main.500', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left">
                Confirmación de Pago
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              El cliente recibirá una confirmación de su pago mediante un mensaje a la dirección de correo electrónico proporcionada a nuestro sitio. Este correo incluirá todos los detalles de la transacción y el recibo de compra.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'main.500', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left">
                Medidas Contra Pago Fraudulento
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              En caso de que se detecte un pago sospechoso que no pueda ser aclarado entre la entidad bancaria, la financiera y <strong>El Chuletazo</strong>, y la orden correspondiente haya sido entregada sin que <strong>El Chuletazo</strong> haya logrado cobrar el pago, se tomarán medidas estrictas. Tanto el cliente involucrado, como la tarjeta utilizada en la transacción y sus destinatarios, serán vetados y no podrán realizar compras futuras en nuestra tienda.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default InfoPagos;