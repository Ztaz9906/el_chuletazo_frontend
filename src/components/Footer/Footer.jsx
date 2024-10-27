import { Box, Text, VStack, Grid, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="#fffaef"
      color="gray"
    >
      <Container maxW="container.xl" py={12}>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
          }}
          gap={8}
        >
          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" fontSize="xl">DIRECCIÓN</Text>
            <Text>6801 Los Volcanes Rd NW,</Text>
            <Text>Albuquerque, NM 87121</Text>
            <Text>Abierto todos los días: 8:00am-5:00pm</Text>
          </VStack>

          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" fontSize="xl">CONTACTOS</Text>
            <Text>Teléfono: +1 (505) 340-1674</Text>
            <Text>Email: ayuda@elchuletazo.com</Text>
          </VStack>

          <VStack align="start" spacing={3}>
            <Text>
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