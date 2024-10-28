import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Grid,
  Icon,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Heart, Package, Timer, Truck, ArrowRight } from 'lucide-react';
import Header from '@/components/header/Header';
import ImageCarousel from '@/components/home/landingPage/ImageCarousel';

const fadeInUp = {
  initial: { opacity: 0.8, y: 30 },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
};

const scaleIn = {
  initial: { opacity: 0.8, scale: 0.95 },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.3 }
};

const LandingPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Box
        position="fixed" 
        top="0" 
        left="0" 
        right="0" 
        zIndex="1000"
        bgGradient="linear(to-r, green.100, green.100)"
      >
        <Header/>
      </Box>
           
        <Box
          position="relative"
          height={{ base: "90vh", md: "80vh" }}
          bgGradient="linear(to-b,  green.100, #fffaef)"
          overflow="hidden"
        >
        <Container maxW="container.xl" h="full" position="relative" zIndex="2">
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={8}
            h="full"
            alignItems="center"
          >
            <motion.div {...fadeInUp}>
              <Heading
                as="h1"
                size="2xl"
                color="green.600"
                lineHeight="shorter"
                mb={6}
              >
                Conectando familias a través de{" "}
                <Text as="span" color="cart.300">
                  sabores cubanos
                </Text>
              </Heading>
              <Text fontSize="xl" color="gray.600" mb={8}>
                Lleva la alegría a tus seres queridos en Cuba con productos de calidad, 
                entregados directamente a su puerta.
              </Text>
              <Button
                as={Link}
                to="/productos"
                size="lg"
                colorScheme="green"
                rightIcon={<ArrowRight />}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                  bg: "cart.300",
                }}
              >
                Ver Productos
              </Button>
            </motion.div>

            <motion.div {...scaleIn} style={{ display: isMobile ? 'none' : 'block' }}>
              <ImageCarousel/>
            </motion.div>
          </Grid>
        </Container>
      </Box>

      <Box py={20} bgGradient="linear(to-b , #fffaef, white)" position="relative">
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="1"
        />

        <Container maxW="container.xl" position="relative" zIndex="2">
          <motion.div {...fadeInUp}>
            <Heading
              textAlign="center"
              mb={16}
              fontSize="4xl"
              color="green.600"
            >
              ¿Por qué elegir {" "}
                <Text as="span" color="cart.300">
                  El Chuletazo?
                </Text>
            </Heading>
          </motion.div>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
            gap={8}
          >
            {[
              {
                icon: Heart,
                title: "Calidad Garantizada",
                description: "Seleccionamos cuidadosamente cada producto para asegurar la mejor calidad"
              },
              {
                icon: Package,
                title: "Empaque Seguro",
                description: "Embalaje especial para mantener los productos en perfectas condiciones"
              },
              {
                icon: Truck,
                title: "Entrega Confiable",
                description: "Sistema de entrega eficiente directamente a la puerta en Cuba"
              },
              {
                icon: Timer,
                title: "Envío Rápido",
                description: "Procesamiento y envío rápido para que llegue lo antes posible"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...scaleIn}
                style={{ height: '100%' }}
              >
                <Box
                  p={6}
                  height="100%"
                  borderRadius="lg"
                  bg="green.50"
                  shadow= "xl"
                  _hover={{
                    transform: "translateY(-8px)",
                    shadow: "xl",
                    bg: "#ffecc1"
                  }}
                  transition="all 0.3s"
                >
                  <VStack spacing={4} align="center">
                    <Icon
                      as={feature.icon}
                      boxSize={12}
                      color="cart.300"
                    />
                    <Heading size="md" color="cart.300">
                      {feature.title}
                    </Heading>
                    <Text color="grey" textAlign="center">
                      {feature.description}
                    </Text>
                  </VStack>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box py={20} position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(to-b, white, #fffaef)" 
          backgroundPosition="center"
          zIndex="1"
        />

        <Container maxW="container.xl" position="relative" zIndex="2">
          <motion.div {...fadeInUp}>
            <Stack spacing={8} align="center" mb={12}>
              <Heading
                textAlign="center"
                color="green.500"
                size="2xl"
              >
                Nuestros Productos
              </Heading>
              <Text
                textAlign="center"
                fontSize="xl"
                color="gray"
                maxW="3xl"
              >
                Navega en nuestro sitio y descubre la selección de variados productos de alta calidad con la que contamos, 
                elegidos cuidadosamente para satisfacer los gustos más exigentes de cada uno de nuestros clientes.
              </Text>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      <Box 
      py={20} 
      bgGradient="linear(to-b, #fffaef, green.100)" 
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100px",
        bgGradient: "linear(to-b, #fffaef, transparent)",
        zIndex: 1
        }}
        >

        <Container maxW="container.xl">
          <motion.div {...fadeInUp}>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={8}
              align="center"
              justify="space-between"
            >
              <VStack align={{ base: "center", md: "start" }} spacing={4}>
                <Heading color="green.500" size="xl">
                  ¿Listo para hacer feliz a alguien?
                </Heading>
                <Text color="cart.300" fontSize="lg">
                 <strong> Comienza a enviar productos de calidad a tus seres queridos HOY mismo. </strong>
                </Text>
              </VStack>
              <Button
                as={Link}
                to="/productos"
                size="lg"
                colorScheme="white"
                bg="green.500"
                _hover={{
                  bg: "cart.300",
                  color: "white",
                }}
              >
                Comprar Ahora
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;