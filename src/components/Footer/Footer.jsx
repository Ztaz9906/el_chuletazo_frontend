import { Box, Text, VStack, Grid, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="#fffaef"
      color="gray"
      py={6} // Ajuste del padding vertical
    >
      <Container maxW="container.xl">
        <Grid
          templateColumns={{
            base: "1fr", // Una columna en pantallas pequeñas
            sm: "repeat(2, 1fr)", // Dos columnas en pantallas pequeñas
            md: "repeat(3, 1fr)" // Tres columnas en pantallas medianas y grandes
          }}
          gap={6} // Espacio entre las columnas
        >
          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>DIRECCIÓN</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>6801 Los Volcanes Rd NW,</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Albuquerque, NM 87121</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Abierto todos los días: 8:00am-5:00pm</Text>
          </VStack>

          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>CONTACTOS</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Teléfono: +1 (505) 340-1674</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Email: ayuda@elchuletazo.com</Text>
          </VStack>

          <VStack align="start" spacing={3}>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Para cualquier información adicional, por favor comuníquese con
              nosotros a través de los contactos proporcionados.
            </Text>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;