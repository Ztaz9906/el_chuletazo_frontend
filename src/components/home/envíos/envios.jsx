import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Hide,
  Image,
  Text,
} from "@chakra-ui/react";

const InfoEnvios = () => {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      bg="white"
      shadow="md"
      p={4}
      mr={2}
      ml={2}
    >
      <Text
        fontSize={["2xl", "3xl", "4xl"]}
        fontWeight="bold"
        color="green.500"
        mb={4}
      >
        Envíos
      </Text>

      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize={["md", "lg", "xl"]}
                color="grey"
                fontWeight="bold"
              >
                Provincias a las que se hacen llegar los envíos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex flexDirection={["column", "row"]} align={["start", "center"]}>
              <Box flex="1" pr={[0, 4]} mb={[4, 0]}>
                <Text fontSize="md" color="gray.700" mb={2}>
                  En "El Chuletazo" hacemos entregas en cada uno de los
                  municipios que pertenecen a las siguientes provincias:
                </Text>

                <Text fontSize="md" color="gray.700">
                  • Artemisa
                </Text>
                <Text fontSize="md" color="gray.700">
                  • La Habana
                </Text>
                <Text fontSize="md" color="gray.700">
                  • Mayabeque
                </Text>
                <Text fontSize="md" color="gray.700">
                  • Matanzas
                </Text>
              </Box>
              <Hide below="md">
                <Image
                  src="/gif/mapa_cuba.gif"
                  alt="Mapa de Cuba"
                  width={200}
                />
              </Hide>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize={["md", "lg", "xl"]}
                color="grey"
                fontWeight="bold"
              >
                Tarifas y Duración del Envío
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text fontSize="md" color="gray.700" mb={2}>
              •<strong> Tarifas:</strong> Varían según la provincia, diseñadas
              para ser asequibles.
            </Text>
            <Text fontSize="md" color="gray.700">
              •<strong> Duración:</strong> El tiempo estimado de entrega es de 3
              a 4 días hábiles, asegurando que tus productos lleguen a tiempo.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize={["md", "lg", "xl"]}
                color="grey"
                fontWeight="bold"
              >
                Proceso de Entrega y Recepción
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text fontSize="md" color="gray.700" mb={2}>
              • Las entregas son realizadas de manera personalizada en el
              domicilio del destinatario.
            </Text>
            <Text fontSize="md" color="gray.700" mb={2}>
              • Si el destinatario no está presente, la orden no será entregada
              a otras personas no indicadas en la orden.
            </Text>
            <Text fontSize="md" color="gray.700" mb={2}>
              • El comprador podrá especificar un nombre alternativo para
              recibir el pedido en caso de que el destinatario no esté presente.
            </Text>
            <Text fontSize="md" color="gray.700">
              • El receptor deberá revisar los productos junto con el
              distribuidor para asegurar que las cantidades coincidan con la
              factura. Una vez firmada y aceptada la orden de entrega, no se
              aceptarán reclamaciones por productos faltantes.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default InfoEnvios;
